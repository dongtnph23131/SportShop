import https from "https";
import { createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import Customer from "../models/customer";
import Order from "../models/order";
import ProductVariant from "../models/productVariant";
import Product from "../models/product";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
export const PayMomo = (req, res) => {
  const body = req.body;
  const partnerCode = "MOMO";
  const accessKey = "F8BBA842ECF85";
  const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const requestId = partnerCode + new Date().getTime();
  const orderId = requestId;
  const orderInfo = "Thanh Toán MoMo";
  const redirectUrl = "http://localhost:8080/api/momo";
  const ipnUrl = "http://localhost:8080/api/momo";
  const amount = (body.totalPrice + body.shippingPrice) * 22275;
  const requestType = "payWithMethod";
  const extraData = `email=${body.email}&fullName=${body.fullName}&totalPrice=${
    body.totalPrice
  }&token=${body.token}&shippingPrice=${body.shippingPrice}&phone=${
    body.phone
  }&address=${body.address}&note=${body.note}&items=${JSON.stringify(
    body.items
  )}`;

  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  const signature = createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  const reqMomo = https.request(options, (resMomo) => {
    resMomo.setEncoding("utf8");
    resMomo.on("data", (body) => {
      res.json({ payUrl: JSON.parse(body).payUrl });
    });
    resMomo.on("end", () => {});
  });

  reqMomo.on("error", (e) => {});
  reqMomo.write(requestBody);
  reqMomo.end();
};
export const MomoSuccess = async (req, res) => {
  const query = req.query;
  const data = {};
  const keyValuePairs = query.extraData.split("&");

  keyValuePairs.forEach((keyValue) => {
    const [key, value] = keyValue.split("=");

    if (key === "items") {
      data[key] = JSON.parse(decodeURIComponent(value));
    } else {
      data[key] = decodeURIComponent(value);
    }
  });
  const body = {
    ...data,
    shippingPrice: Number(data.shippingPrice),
    totalPrice: Number(data.totalPrice),
  };

  const { id } = jwt.verify(data.token, "dongtimo");
  const user = await Customer.findById(id);
  const order = await Order.create({
    ...body,
    typePayment: "Online",
    customerId: user._id,
    orderTotalPrice: body.totalPrice - body.shippingPrice,
    paymentStatus: data.message == "Successful." ? "Paid" : "Not paid",
    code: `DH-${generateRandomString()}`,
  });
  await Promise.all(
    data.items.map(async (item) => {
      const productVariant = await ProductVariant.findById(
        item.productVariantId
      );
      await ProductVariant.findByIdAndUpdate(
        productVariant._id,
        {
          inventory: productVariant.inventory - item.quantity,
        },
        { new: true }
      );
      const product = await Product.findById(item.productId);
      await Product.findByIdAndUpdate(
        item.productId,
        { purchases: product.purchases + item.quantity },
        { new: true }
      );
    })
  );
  await Customer.findByIdAndUpdate(
    user._id,
    {
      $addToSet: { orderIds: order._id },
    },
    { new: true }
  );

  await CartItem.deleteMany({
    customerId: user._id,
  });

  const cart = await Cart.findOne({ customerId: user._id });
  cart.items = [];
  await cart.save({ validateBeforeSave: false });
  res.redirect("http://localhost:5173/OrderClient");
};
