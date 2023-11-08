import React from "react";
import "../../src/Assets/orderDetail.css";

const OrderDetail = () => {
  return (
    <div>
      <div className="account-page__content">
        <div id="detail-order">
          <div className="thank-box">
            <div className="detail-order">
              <h1 className="detail-order-heading">
                Thông tin đơn hàng #24357265526
              </h1>
              <div className="detail-order-status"> Đã bị hủy</div>
            </div>
            <div className="detail-order-info">
              <ul className="detail-order-info__list">
                <li>
                  <div className="detail-order-info__title">Ngày đặt hàng:</div>
                  <div className="detail-order-info__content">
                    23:01 08.11.2023
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Tên người nhận</div>
                  <div className="detail-order-info__content">
                    nguyễn thế bảo
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Địa chỉ Email:</div>
                  <div className="detail-order-info__content">
                    tranngocdong2042003@gmail.com
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Số điện thoại:</div>
                  <div className="detail-order-info__content">0988252613</div>
                </li>
                <li>
                  <div className="detail-order-info__title">
                    Phương thức thanh toán:
                  </div>
                  <div className="detail-order-info__content">COD</div>
                </li>
                <li>
                  <div className="detail-order-info__title">
                    Địa chỉ giao hàng:
                  </div>
                  <div className="detail-order-info__content">
                    xom4-thủy xuân tiên- chương mỹ - hà nội, Thị trấn Xuân Mai,
                    Huyện Chương Mỹ, Hà Nội
                  </div>
                </li>
                <li>
                  <div className="detail-order-info__title">Ghi chú:</div>
                  <div className="detail-order-info__content"></div>
                </li>
              </ul>
            </div>
            <div className="grid detail-order-button">
              <div className="grid__column">
                <div
                  className="order-date"
                
                ></div>
              </div>
            </div>
            <table className="table" >
              <thead>
                <tr>
                  <th>Tên sản phẩm</th> <th>Số lượng</th>
                  <th>Giá niêm yết</th>
                  <th>Biến thể</th>
                  <th className="text-righted">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text--left">
                    <div>
                      <div className="detail-order-item__thumbnail">
                        <img src="https://media.coolmate.me/cdn-cgi/image/width=255,height=380,quality=80,format=auto/uploads/April2022/DSC08244_copy.jpg" />
                      </div>
                      <div className="detail-order-item__title">
                        T-Shirt The Future Is Yours <br />
                      </div>
                    </div>
                  </td>
                  <td>2</td>
                  <td>
                    149.000đ
                    <del>329.000đ</del>
                  </td>
                  <td>M</td> <td >298.000đ</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4">Mã giảm giá</td> <td></td>
                </tr>
                <tr>
                  <td colspan="4">Tổng giá trị sản phẩm</td> <td>298.000đ</td>
                </tr>
                <tr>
                  <td colspan="4">Tổng khuyến mãi</td> <td>0đ</td>
                </tr>
                <tr>
                  <td colspan="4">Phí giao hàng</td> <td>0đ</td>
                </tr>
                <tr className="total_payment">
                  <td colspan="4">Tổng thanh toán</td> <td>298.000đ</td>
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
