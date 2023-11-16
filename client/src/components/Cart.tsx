import Cookies from "js-cookie";
import { useGetCartOfUserQuery } from "../api/cart";
import CartItem from "./pages/client/Ui/CartItem";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateOrderMutation } from "../api/order";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  fullName: yup.string().required("Họ tên không được để trống"),
  phone: yup.string().required("Số điện thoại k được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  node: yup.string(),
  typePayment: yup.string().required("Chọn hình thức thanh toán"),
  email: yup.string(),
});
const Cart = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const token = Cookies.get("token");
  const { data: carts } = useGetCartOfUserQuery(token);
  const total = token
    ? carts?.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator +
          currentValue.productVariantIds.price * currentValue.quantity,
        0
      )
    : "";

  const onAddOrder = async (data: any) => {
    if (carts?.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }
    const items = carts.map((item: any) => {
      return {
        productId: item.productIds._id,
        productVariantId: item.productVariantIds._id,
        quantity: item.quantity,
      };
    });
    const order = {
      ...data,
      totalPrice: total,
      shippingPrice: 0,
      items,
      email: Cookies.get("email"),
    };
    await createOrder({ token, order }).then((data: any) => {
      message.success(data.data.message);
      navigate("/OrderClient");
    });
  };
  return (
    <div>
      <section id="page-header3" className="about-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      {!token ? (
        <div>Chưa đăng nhập</div>
      ) : (
        <>
          {!carts?.message ? (
            <>
              {carts?.length === 0 ? (
                <div className="cart__zero">
                  <div className="icon__cart__0">
                    {" "}
                    <img src="../../src/Assets/icon__cart__0.png" alt="" />
                  </div>
                  <h3>Giỏ hàng của bạn đang trống</h3>
                  <button className="payNow__cart0"><a href="/shops">Mua ngay</a></button>
                </div>
              ) : (
                <>
                  <section id="cart" className="section-p1 cart__ss">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Remove</td>
                          <td>Image</td>
                          <td>Product</td>
                          <td>Price</td>
                          <td>Quantity</td>
                          <td>Subtotal</td>
                        </tr>
                      </thead>
                      <tbody>
                        {carts?.map((cartItem: any) => {
                          return (
                            <CartItem key={cartItem._id} item={cartItem} />
                          );
                        })}
                      </tbody>
                    </table>
                  </section>
                </>
              )}
            </>
          ) : (
            <>{carts.message}</>
          )}
          <form onSubmit={handleSubmit(onAddOrder)}>
            <section id="cart-add" className="section-p1">
              <div id="subtotal" className="ttnh">
                <h3>Thông tin nhận hàng</h3>
                <table>
                  <tr>
                    <input
                      {...register("fullName")}
                      type="text"
                      defaultValue={
                        `${Cookies.get("firstName")}` +
                        " " +
                        `${Cookies.get("lastName")}`
                      }
                      placeholder="Họ tên"
                    />
                  </tr>
                  <p className="error">
                    {errors.fullName ? errors?.fullName.message : ""}
                  </p>
                  <tr>
                    <input
                      disabled
                      {...register("email")}
                      value={Cookies.get("email")}
                      type="text"
                      placeholder="Email"
                    />
                  </tr>
                  <tr></tr>
                  <tr>
                    <input
                      {...register("phone")}
                      type="text"
                      placeholder="Số điện thoại"
                    />
                  </tr>
                  <p className="error">
                    {errors.phone ? errors?.phone.message : ""}
                  </p>
                  <tr>
                    <input
                      {...register("address")}
                      type="text"
                      placeholder="Địa chỉ "
                    />
                  </tr>
                  <p className="error">
                    {errors.address ? errors?.address.message : ""}
                  </p>
                  <tr>
                    <textarea
                      {...register("node")}
                      placeholder="Ghi chú giao hàng "
                    />
                  </tr>
                  <p className="error">
                    {errors.node ? errors?.node.message : ""}
                  </p>
                </table>
                <div className="group__btnPay">
                  <button className="normal">Proceed to checkout</button>
                </div>
              </div>

              <div id="subtotal">
                <h3>Cart Totals</h3>
                <table>
                  <tr>
                    <td>Cart Subtotal</td>
                    <td>$ {total ? total : ""}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>$ 0</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td>
                      {token
                        ? carts?.reduce(
                            (accumulator: any, currentValue: any) =>
                              accumulator + currentValue.quantity,
                            0
                          )
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>$ {total + 0}</strong>
                    </td>
                  </tr>
                </table>

                <div className="">
                  <div className="infomation-item payment-method">
                    <h2 className="infomation-title">
                      <svg
                        className="bi bi-wallet2"
                        fill="currentColor"
                        height="16"
                        viewBox="0 0 16 16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"></path>
                      </svg>
                      <span>Phương Thức Thanh Toán</span>
                    </h2>
                    <div className="infomation-content">
                      <div className="delivery-type-item">
                        <input
                          value={"Direct"}
                          {...register("typePayment")}
                          type="radio"
                          className="ng-untouched ng-pristine ng-valid"
                        />
                        <label>
                          <span className="delivery-title">
                            Thanh toán khi nhận hàng
                          </span>
                        </label>
                      </div>
                      <div className="delivery-type-item">
                        <input
                          value={"Online"}
                          {...register("typePayment")}
                          type="radio"
                          className="ng-untouched ng-pristine ng-valid"
                        />
                        <label>
                          <span className="delivery-title">
                            Thanh toán online
                          </span>
                        </label>
                      </div>
                      <p className="error">
                        {errors.typePayment ? errors?.typePayment.message : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;
