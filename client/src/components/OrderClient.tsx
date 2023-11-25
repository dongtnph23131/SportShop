import "../../src/Assets/orderClient.css";
import Cookies from "js-cookie";
import { useGetOrderByUserQuery } from "../api/order";
import { NavLink } from "react-router-dom";
const OrderClient = () => {
  const token = Cookies.get("token");
  const { data: orders } = useGetOrderByUserQuery(token);

  return (
    <div>
      <div className="box-oder-carts">
        <div className="account-page__content">
          <div>
            <h3 className="account-page-title">Lịch sử đơn hàng</h3>{" "}
            <div className="account-page__label">
              Đơn hàng của bạn
              <span>: {orders?.orders?.length} đơn hàng</span>
            </div>{" "}
            {orders?.orders?.map((item: any) => {
              return (
                <NavLink to={`/orderDetail/${item._id}`} key={item._id}>
                  <div>
                    <div>
                      <div className="orders-body mgt--10">
                        <div className="orders-wrapper">
                          <a href="" className="order">
                            <div className="order-header">
                              <div>
                                <p className="order-title"> {item.code}</p>{" "}
                                <p className="order-date">{new Date(item.createdAt).toLocaleString()}</p>
                              </div>{" "}
                              <div className="order-status-badge order-status-badge-canceled">
                                {" "}
                                <span>{item.status}</span>
                              </div>
                            </div>{" "}
                            {item.items.map((itemOrder: any) => {
                              return (
                                <div key={itemOrder._id}>
                                  <div className="order-body">
                                    <div>
                                      <div className="order-item">
                                        <div className="order-item-thumbnail">
                                          <a
                                            href="/product/ao-thun-oversize-in-the-future-is-yours-clean-vietnam-mau-trang"
                                            target="_blank"
                                          >
                                            <img
                                              src={
                                                itemOrder?.productId?.images[0]
                                                  .url
                                              }
                                              alt="T-Shirt The Future Is Yours"
                                            />
                                          </a>
                                        </div>{" "}
                                        <div className="order-item-info">
                                          <a className="order-item-title">
                                            {itemOrder.productId.name}
                                          </a>{" "}
                                          <div className="order-item-variant-label">
                                            {itemOrder.productVariantId.name}
                                          </div>{" "}
                                          <div className="order-item-quantity">
                                            x {itemOrder.quantity}
                                          </div>{" "}
                                          <div className="order-item-price">
                                            $ {itemOrder.productVariantId.price}
                                          </div>
                                        </div>{" "}
                                      </div>
                                    </div>
                                  </div>{" "}
                                  <div className="order-footer">
                                    <div className="order-footer__left"></div>{" "}
                                    <div className="order-footer__right">
                                      <div>
                                        <b>${item.totalPrice}</b>
                                      </div>{" "}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </a>
                        </div>{" "}
                      </div>{" "}
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderClient;
