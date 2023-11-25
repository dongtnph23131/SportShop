import { useParams } from "react-router-dom";
import "../../src/Assets/orderDetail.css";
import { useCancelOrderMutation, useGetOneOrderQuery } from "../api/order";
import Cookies from "js-cookie";
import { message } from "antd";
const OrderDetail = () => {
  const { id }: any = useParams();
  const token = Cookies.get("token");
  const { data } = useGetOneOrderQuery(id);
  const [cancelOrder] = useCancelOrderMutation();
  return (
    <div>
      <div className="account-page__content">
        <div id="detail-order">
          <div className="thank-box">
            <div className="detail-order">
              <h1 className="detail-order-heading">
                Thông tin đơn hàng #{data?.order?._id}
              </h1>
              <div className="detail-order-status">Trạng thái đơn hàng: {data?.order?.status}</div>
            </div>
            <div className="detail-order-info">
              <ul className="detail-order-info__list">
                <li>
                  <div className="detail-order-info__title">Ngày đặt hàng:</div>
                  <div className="detail-order-info__content">
                    {data?.order?.createdAt}
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Tên người nhận</div>
                  <div className="detail-order-info__content">
                    {data?.order?.fullName}
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Địa chỉ Email:</div>
                  <div className="detail-order-info__content">
                    {data?.order?.email}
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Số điện thoại:</div>
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
                <li>
                  <div className="detail-order-info__title">
                    Địa chỉ giao hàng:
                  </div>
                  <div className="detail-order-info__content">
                    {data?.order?.address}
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Ghi chú:</div>
                  <div className="detail-order-info__content"></div>
                </li>
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
                      <td>${item?.quantity * item?.productVariantId?.price}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}>Mã giảm giá</td> <td></td>
                </tr>
                <tr>
                  <td colSpan={4}>Tổng giá trị sản phẩm</td>{" "}
                  <td>${data?.order?.totalPrice}</td>
                </tr>
                <tr>
                  <td colSpan={4}>Tổng khuyến mãi</td>{" "}
                  <td>${data?.order?.couponPrice}</td>
                </tr>
                <tr>
                  <td colSpan={4}>Phí giao hàng</td>{" "}
                  <td>${data?.order?.shippingPrice}</td>
                </tr>
                <tr className="total_payment">
                  <td colSpan={4}>Tổng thanh toán</td>{" "}
                  <td>${data?.order?.totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
