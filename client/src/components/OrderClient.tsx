import React from "react";
import "../../src/Assets/orderClient.css"


const OrderClient = () => {
  return (
    <div>
      <div className="box-oder-carts">
      

        <div className="account-page__content">
          
          <div><h3 className="account-page-title">
        Lịch sử đơn hàng
    </h3> <div><div ><div  className="account-page__label">
        Đơn hàng của bạn<span >: 1 đơn hàng</span></div> <div className="orders-body mgt--10"><div className="orders-wrapper"><a href="" className="order"><div className="order-header"><div><p className="order-title">
                            #24357265526
                        </p> <p className="order-date" >
                            08.11.2023
                        </p></div> <div className="order-status-badge order-status-badge-canceled">   <span>Đã huỷ</span></div></div> <div className="order-body"><div><div className="order-item"><div className="order-item-thumbnail"><a href="/product/ao-thun-oversize-in-the-future-is-yours-clean-vietnam-mau-trang" target="_blank"><img src="https://media.coolmate.me/cdn-cgi/image/width=160,height=181,quality=80/image/April2022/DSC08244_copy.jpg" alt="T-Shirt The Future Is Yours" /></a></div> <div className="order-item-info"><a  className="order-item-title">
            T-Shirt The Future Is Yours
        </a> <div className="order-item-variant-label">
            M
        </div> <div className="order-item-quantity">
            x 2
        </div> <div className="order-item-price">
            149.000đ
        </div></div> </div></div></div> <div className="order-footer"><div className="order-footer__left"></div> <div className="order-footer__right"><div><b>298.000đ</b></div> </div></div></a></div> </div> </div></div></div></div>
      </div>
    </div>
  );
};

export default OrderClient;
