import "../../src/Assets/orderClient.css";
import Cookies from "js-cookie";
import { useGetOrderByUserQuery } from "../api/order";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { translateOrderStatus } from "../utils";
const OrderClient = () => {
  const token = Cookies.get("token");
  const [orders, setOrders] = useState<any>([]);
  const { data, isLoading } = useGetOrderByUserQuery(token);
  const [page, setPage] = useState<any>(1);
  useEffect(() => {
    setOrders(data?.orders.slice((page - 1) * 4, page * 4));
  }, [page, data]);
  const formatPrice = (price: any) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return formattedPrice;
  };
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải ...</div>
      ) : (
        <div className="container">
          <div className="box-oder-carts">
            <div className="account-page__content">
              <div>
                <h3 className="account-page-title">Lịch sử đơn hàng</h3>{" "}
                <div className="account-page__label">
                  Đơn hàng của bạn
                  <span>: {data?.orders?.length} đơn hàng</span>
                </div>{" "}
                {orders?.map((item: any) => {
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
                                    <p className="order-date">
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>{" "}
                                  <div className="order-status-badge order-status-badge-canceled">
                                    {" "}
                                    <span>
                                      {translateOrderStatus(item.status)}
                                    </span>
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
                                                    itemOrder?.productId
                                                      ?.images[0].url
                                                  }
                                                  alt="T-Shirt The Future Is Yours"
                                                />
                                              </a>
                                            </div>{" "}
                                            <div className="order-item-info">
                                              <a className="order-item-title">
                                                {itemOrder?.productVariantName}
                                              </a>{" "}
                                              <div className="order-item-variant-label">
                                                {itemOrder?.productVariantName}
                                              </div>{" "}
                                              <div className="order-item-quantity">
                                                x {itemOrder.quantity}
                                              </div>{" "}
                                              <div className="order-item-price">
                                                {" "}
                                                {formatPrice(
                                                  itemOrder?.productVariantPrice
                                                )}
                                              </div>
                                            </div>{" "}
                                          </div>
                                        </div>
                                      </div>{" "}
                                    </div>
                                  );
                                })}
                                <div className="order-footer">
                                  <div className="order-footer__left"></div>{" "}
                                  <div className="order-footer__right">
                                    <div>
                                      <b>{formatPrice(item.orderTotalPrice)}</b>
                                    </div>{" "}
                                  </div>
                                </div>
                              </a>
                            </div>{" "}
                          </div>{" "}
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
              {orders?.length > 0 ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <Pagination
                    defaultCurrent={1}
                    onChange={(value) => setPage(value)}
                    total={data?.orders?.length}
                    pageSize={4}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderClient;
