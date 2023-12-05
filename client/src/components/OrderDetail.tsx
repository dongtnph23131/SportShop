import { useParams } from "react-router-dom";
import "../../src/Assets/orderDetail.css";
import { useCancelOrderMutation, useGetOneOrderQuery } from "../api/order";
import Cookies from "js-cookie";
import { Button, Modal, message } from "antd";
import { useState } from "react";
const OrderDetail = () => {
  const { id }: any = useParams();
  const token = Cookies.get("token");
  const { data, isLoading } = useGetOneOrderQuery(id);
  const [cancelOrder] = useCancelOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [infoStaff, setInforStaff] = useState<any>("");
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>
      ) : (
        <div className="container">
          <div className="account-page__content">
            <div id="detail-order">
              <div className="thank-box">
                <div className="detail-order">
                  <h1 className="detail-order-heading">
                    Thông tin đơn hàng {data?.order?.code}
                  </h1>
                  <div className="detail-order-status">
                    Trạng thái đơn hàng: {data?.order?.status}
                  </div>
                  <div className="detail-order-status">
                    Trạng thái thanh toán: {data?.order?.paymentStatus}
                  </div>
                </div>
                <div className="detail-order-info">
                  <ul className="detail-order-info__list">
                    <li>
                      <div className="detail-order-info__title">
                        Ngày đặt hàng:
                      </div>
                      <div className="detail-order-info__content">
                        {new Date(data?.order?.createdAt).toLocaleString()}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Tên người nhận
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.fullName}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Địa chỉ Email:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.email}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Số điện thoại:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.phone}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Phương thức thanh toán:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.typePayment}
                      </div>
                    </li>
                    {data?.order?.discountId ? (
                      <li>
                        <div className="detail-order-info__title">
                          Mã giảm giá
                        </div>
                        <div className="detail-order-info__content">
                          {data?.order?.discountId?.code}
                        </div>
                      </li>
                    ) : (
                      <></>
                    )}
                    <li>
                      <div className="detail-order-info__title">
                        Trạng thái giao hàng:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.deliveryStatus}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Nhân viên quản lí đơn:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.managerId?.firstName}{" "}
                        {data?.order?.managerId?.lastName}{" "}
                        <Button
                          type="primary"
                          onClick={() => {
                            showModal();
                            setInforStaff(data?.order?.managerId);
                          }}
                        >
                          View
                        </Button>
                        <Modal
                          title="Thông tin nhân viên quản lí đơn"
                          open={isModalOpen}
                          onOk={() => {
                            handleOk();
                            setInforStaff("");
                          }}
                          onCancel={() => {
                            handleCancel();
                            setInforStaff("");
                          }}
                        >
                          <p>Số điện thoại: {infoStaff?.phone}</p>
                          <p>Email: {infoStaff?.email}</p>
                        </Modal>
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Địa chỉ giao hàng:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.address}
                      </div>
                    </li>
                    {data?.oder?.node ? (
                      <li>
                        <div className="detail-order-info__title">Ghi chú:</div>
                        <div className="detail-order-info__content"></div>
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
                {data?.order?.deliveryStatus === "Shipping" ||
                data?.order?.status === "Completed" ||
                data?.order?.status === "Canceled" ? (
                  ""
                ) : (
                  <button
                    className="detail-order-status"
                    onClick={async () => {
                      if (confirm("Bạn có muốn hủy đơn hàng không ?")) {
                        await cancelOrder({ token, id }).then(() => {
                          message.success("Hủy đơn hàng thành công");
                        });
                      }
                    }}
                  >
                    Hủy đơn
                  </button>
                )}
                <div className="grid detail-order-button">
                  <div className="grid__column">
                    <div className="order-date"></div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th> <th>Số lượng</th>
                      <th>Giá niêm yết</th>
                      <th>Biến thể</th>
                      <th className="text-righted">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.order?.items?.map((item: any) => {
                      return (
                        <tr>
                          <td className="text--left">
                            <div>
                              <div className="detail-order-item__thumbnail">
                                <img src={item?.productId?.images[0]?.url} />
                              </div>
                              <div className="detail-order-item__title">
                                {item?.productId?.name} <br />
                              </div>
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>${item?.productVariantId?.price}</td>
                          <td>{item?.productVariantId?.name}</td>{" "}
                          <td>
                            ${item?.quantity * item?.productVariantId?.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4}>Tổng giá trị sản phẩm</td>{" "}
                      <td>${data?.order?.totalPrice}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Giảm giá</td>{" "}
                      <td>${data?.order?.couponPrice}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Phí giao hàng</td>{" "}
                      <td>${data?.order?.shippingPrice}</td>
                    </tr>
                    <tr className="total_payment">
                      <td colSpan={4}>Tổng thanh toán</td>{" "}
                      <td>${data?.order?.orderTotalPrice}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
