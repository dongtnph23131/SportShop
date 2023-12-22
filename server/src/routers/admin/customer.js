import { Router } from "express";
import Customer from "../../models/customer";
import Gift from "../../models/gift";
import nodemailer from "nodemailer";
import { formatPrice } from "../../libs/utils";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().populate("orderIds");

    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "orderIds giftIds"
    );

    if (!customer) {
      return res.status(404).send("Customer does not exist!");
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).send("Customer does not exist!");
    }

    return res.status(200).json("Deleted customer successfully!");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:id/gift", async (req, res) => {
  try {
    const { code, description, amountPrice, endAt } = req.body;

    const gift = await Gift.create({
      code: code,
      description: description,
      amountPrice: amountPrice,
      ...(endAt && { endAt: endAt }),
      customerId: req.params.id,
    });

    if (!gift) {
      return res.status(500).json({
        message: "Create gift failed!",
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { giftIds: gift._id },
      },
      { new: true }
    );

    //send gift card email to customer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tranngocdong2042003@gmail.com",
        pass: process.env.PasswordMail,
      },
    });

    let mailOptions = {
      from: "tranngocdong2042003@gmail.com",
      to: customer.email,
      subject: "Sport Shop - Tri ân khách hàng",
      text: `Mã khuyến mại: ${gift.code} \n Mô tả: ${
        gift.description
      } \n Số tiền: ${formatPrice(gift.amountPrice)} \n Hạn sử dụng: ${
        gift.endAt ? new Date(gift.endAt).toLocaleDateString() : "Không có"
      }`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: error });
      } else {
        console.log(`Email sent to ${customer.email}: ` + info.response);
        res.status(200).json({ message: "Email sent successfully." });
      }
    });

    return res.status(200).json("Created gift successfully!");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const customerRoutes = router;
