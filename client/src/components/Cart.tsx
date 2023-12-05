import Cookies from "js-cookie";
import { useGetCartOfUserQuery, useRemoveCartMutation } from "../api/cart";
import CartItem from "./pages/client/Ui/CartItem";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateOrderMutation } from "../api/order";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { useGetAddressByAcountQuery } from "../api/address";
import { usePayMomoMutation } from "../api/payment";
import Swal from "sweetalert2";
import axios from "axios";
import { useGetDiscountsQuery } from "../api/discount";
const schema = yup.object().shape({
  fullName: yup.string().required("Họ tên không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  node: yup.string(),
  typePayment: yup.string().required("Chọn hình thức thanh toán"),
  email: yup.string(),
});
const Cart = () => {
  const [discount, setDiscount] = useState<any>();
  const [code, setCode] = useState<any>("");
  const navigate = useNavigate();
  const [removeCart] = useRemoveCartMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [couponPrice, setCouponPrice] = useState<any>(0);
  const { data: discounts } = useGetDiscountsQuery();
  const [createOrder] = useCreateOrderMutation();
  const [isUseDiscount, setIsUseDiscount] = useState<any>(false);
  const token = Cookies.get("token");
  const [payMomo] = usePayMomoMutation();
  const { data: addresses } = useGetAddressByAcountQuery(token);
  const { data: carts, isLoading: isLoadingCart } =
    useGetCartOfUserQuery(token);
  const total = token
    ? carts?.reduce(
        (accumulator: any, currentValue: any) =>
          accumulator +
          currentValue.productVariantIds?.price * currentValue.quantity,
        0
      )
    : "";
  const onChange = (e: any) => {
    setCode(e.target.value);
  };
  const onAddOrder = async (data: any) => {
    if (carts?.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Giỏ hàng trống",
      });
      return;
    }
    const items = carts.map((item: any) => {
      return {
        productId: item.productIds._id,
        productVariantId: item.productVariantIds._id,
        quantity: item.quantity,
      };
    });
    let order = {
      ...data,
      totalPrice: total,
      shippingPrice: 0,
      couponPrice,
      items,
      email: Cookies.get("email"),
    };
    if (discount) {
      order = { ...order, discountId: discount?._id };
    }
    if (data.typePayment === "Online") {
      const response: any = await payMomo({ ...order, token });
      if (response) {
        window.location.href = response?.data?.payUrl;
      }
      return;
    }
    await createOrder({ token, order });
    await removeCart(token).then(() => {
      message.success("Đặt hàng thành công");
      navigate("/OrderClient");
    });
  };

  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const showAddressModal = () => {
    setAddressModalVisible(true);
  };
  const handleAddressModalCancel = () => {
    setAddressModalVisible(false);
  };
  useEffect(() => {
    reset(
      addresses?.address
        ?.map((item: any) => {
          return {
            fullName: `${item.name}`,
            phone: item.phone,
            address: `${item.address} ${item.ward} ${item.district} ${item.province} `,
            default: item.default,
          };
        })
        .find((item: any) => item.default === true)
    );
  }, [addresses]);
  useEffect(() => {
    if (discount) {
      setCouponPrice(
        discount?.type === "Percentage"
          ? (total * discount?.percentage) / 100
          : discount?.amountPrice
      );
    }
  }, [discount, code]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (carts?.length === 0) {
      message.error("Giỏ hàng trống !!!");
      return;
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <section id="page-header3" className="about-header"></section>
      {!token ? (
        <div className="cart__zero">
          <div className="icon__cart__0">
            <img src="../../src/Assets/icon__cart__0.png" alt="" />
          </div>
          <h3>Bạn chưa đăng nhập ? Hãy tiến hành đăng nhập !</h3>
          <button className="payNow__cart0">
            <a href="/signin">Đăng nhập</a>
          </button>
        </div>
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
                  <button className="payNow__cart0">
                    <a href="/shops">Mua ngay</a>
                  </button>
                </div>
              ) : (
                <>
                  {isLoadingCart ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                      Đang tải ....
                    </div>
                  ) : (
                    <section id="cart" className="section-p1 cart__ss">
                      <table width="100%">
                        <thead>
                          <tr>
                            <td>Xóa</td>
                            <td>Hình ảnh</td>
                            <td>Tên sản phẩm</td>
                            <td>Giá</td>
                            <td>Số lượng</td>
                            <td>Tổng </td>
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
                  )}
                </>
              )}
            </>
          ) : (
            <>{carts.message}</>
          )}
          <form onSubmit={handleSubmit(onAddOrder)}>
            <section id="cart-add" className="section-p1">
              <div id="subtotal" className="ttnh">
                <div className="header__checkout__news">
                  <h3>Thông tin nhận hàng</h3>
                  <div className="btn__add__default__adress">
                    <div onClick={showAddressModal}>
                      {" "}
                      <span className="ic_adr">
                        <i className="fa-solid fa-map-location-dot"></i>
                      </span>{" "}
                      Chọn từ sổ địa chỉ
                    </div>
                  </div>
                  <Modal
                    title="Chọn địa chỉ"
                    visible={isAddressModalVisible}
                    onCancel={handleAddressModalCancel}
                    footer={null}
                  >
                    <>
                      {addresses?.address?.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                          Sổ địa chỉ trống
                        </div>
                      ) : (
                        <>
                          {addresses?.address?.map((item: any) => {
                            return (
                              <div
                                key={item._id}
                                onClick={() => {
                                  reset({
                                    fullName: `${item.name}`,
                                    phone: item.phone,
                                    address: `${item.address} ${item.ward} ${item.district} ${item.province} `,
                                  });
                                  setAddressModalVisible(false);
                                }}
                                className="address-items"
                              >
                                <div
                                  data-v-46be4137=""
                                  data-v-17ff779a=""
                                  className="address-book-item-wrapper"
                                >
                                  <div
                                    data-v-46be4137=""
                                    className="address-book-item selected"
                                  >
                                    <span
                                      data-v-46be4137=""
                                      className="default-address"
                                    >
                                      {item.default === true ? "★" : ""}
                                    </span>{" "}
                                    <div
                                      data-v-46be4137=""
                                      className="address-text"
                                    >
                                      {item.address}, {item.ward},{" "}
                                      {item.district}, {item.province}
                                    </div>{" "}
                                    <div
                                      data-v-46be4137=""
                                      className="info-text"
                                    >
                                      {item.phone},{item.name}
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </>
                  </Modal>
                </div>
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
                    {errors.phone ? errors?.phone?.message : ""}
                  </p>
                  <tr>
                    <input
                      {...register("address")}
                      type="text"
                      placeholder="Địa chỉ "
                    />
                  </tr>
                  <p className="error">
                    {errors.address ? errors?.address?.message : ""}
                  </p>
                  <tr>
                    <textarea
                      {...register("node")}
                      placeholder="Ghi chú giao hàng "
                    />
                  </tr>
                  <p className="error">
                    {errors.node ? errors?.node?.message : ""}
                  </p>
                </table>
                <div className="pro__checkout">
                  <button
                    disabled={carts?.length === 0 || !token}
                    className="normal"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>

              <div id="subtotal">
                <h3>Cart Totals</h3>
                <div onClick={showModal} className="btn__add__default__adress">
                  <div style={{ padding: "20px" }}>
                    <i className="fas fa-tags"></i>Vouchers
                  </div>
                </div>
                <Modal className="title___vocher"
                  title="Thông tin mã giảm giá"
                  open={isModalOpen}
                  onOk={() => {
                    handleOk();
                  }}
                  onCancel={() => {
                    handleCancel();
                  }}
                >
                  {discounts?.map((item: any) => {
                    return (
                      item.usageLimit < item.usageCount && (
                        <div
                          onClick={() => {
                            if (
                              new Date(item.startAt).toLocaleDateString() >
                              new Date().toLocaleDateString()
                            ) {
                              Swal.fire({
                                icon: "error",
                                title: `Mã giảm giá được áp dụng từ ngày ${new Date(
                                  item.startAt
                                ).toLocaleDateString()}`,
                              });
                              return;
                            }
                            if (
                              item.endAt &&
                              new Date(item.endAt).toLocaleDateString() <
                                new Date().toLocaleDateString()
                            ) {
                              Swal.fire({
                                icon: "error",
                                title: `Mã giảm giá được hết hạn từ ngày ${new Date(
                                  item?.endAt
                                ).toLocaleDateString()}`,
                              });
                              return;
                            }
                            setDiscount(item);
                            setCode(item.code);
                            setIsUseDiscount(true);
                            setIsModalOpen(false);
                          }}
                          key={item._id}
                          className="address-items"
                        >
                          <div
                            data-v-46be4137=""
                            data-v-17ff779a=""
                            className="address-book-item-wrapper"
                          >
                            <div
                              data-v-46be4137=""
                              className="address-book-item selected"
                            >
                              <h3>{item.code}</h3>
                              <p>
                                Giảm{" "}
                                {item?.type === "Percentage"
                                  ? `${item?.percentage}% tổng giá trị đơn hàng `
                                  : `${item?.amountPrice} VNĐ tổng giá trị đơn hàng`}
                              </p>
                              <p>
                                Áp dụng từ :{" "}
                                {new Date(item.startAt).toLocaleDateString()}
                              </p>
                              <p>
                                HSD :{" "}
                                {item.endAt
                                  ? `${new Date(
                                      item.endAt
                                    ).toLocaleDateString()}`
                                  : "Không giới hạn"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
                </Modal>
                <div style={{ display: "flex", padding: "10px" }}>
                  <input
                    placeholder="Nhập mã giảm giá"
                    onChange={onChange}
                    value={code}
                    style={{ padding: "10px" }}
                  />
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const data = await axios.get(
                          `http://localhost:8080/api/discounts/${code}`
                        );
                        if (
                          new Date(
                            data?.data?.discount?.startAt
                          ).toLocaleDateString() >
                          new Date().toLocaleDateString()
                        ) {
                          Swal.fire({
                            icon: "error",
                            title: `Mã giảm giá được áp dụng từ ngày ${new Date(
                              data?.data?.discount?.startAt
                            ).toLocaleDateString()}`,
                          });
                          return;
                        }
                        if (
                          data?.data?.discount.endAt &&
                          new Date(
                            data?.data?.discount.endAt
                          ).toLocaleDateString() <
                            new Date().toLocaleDateString()
                        ) {
                          Swal.fire({
                            icon: "error",
                            title: `Mã giảm giá được hết hạn từ ngày ${new Date(
                              data?.data?.discount?.endAt
                            ).toLocaleDateString()}`,
                          });
                          return;
                        }
                        setDiscount(data?.data?.discount);
                        setIsUseDiscount(true);
                      } catch (error) {
                        setIsUseDiscount(false);
                        message.error("Mã khuyến mại không tồn tại");
                      }
                    }}
                    style={{ marginLeft: "20px" }}
                    disabled={!code}
                  >
                    Áp dụng
                  </button>
                </div>
                {isUseDiscount ? (
                  <p style={{ color: "green" }}>Mã giảm giá được áp dụng</p>
                ) : (
                  <></>
                )}
                <table>
                  <tr>
                    <td>Tổng</td>
                    <td>{total ? total : 0} VNĐ</td>
                  </tr>
                  <tr>
                    <td>Phí giao hàng</td>
                    <td>0 VNĐ</td>
                  </tr>
                  <tr>
                    <td>Khuyến mại</td>
                    <td>{couponPrice} VNĐ</td>
                  </tr>
                  <tr>
                    <td>Số lượng</td>
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
                      <strong>Tổng</strong>
                    </td>
                    <td>
                      <strong>{total + 0 - couponPrice} VNĐ</strong>
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
                        {errors.typePayment ? errors?.typePayment?.message : ""}
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
