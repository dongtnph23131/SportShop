import React from "react";
import Cookies from "js-cookie";
import { useAddItemCartMutation, useGetCartOfUserQuery, useRemoveItemCartMutation } from "../api/cart";
const Cart = () => {
  const token = Cookies.get('token')
  const { data: carts } = useGetCartOfUserQuery(token)  
  const [addCart] = useAddItemCartMutation()
  const [removeItemCart]=useRemoveItemCartMutation()
  return (
    <div>
      <section id="page-header3" className="about-header">
        <h2>#let's_talk</h2>
        <p>LEAVE A MESSAGE, We love to hear from you!</p>
      </section>

      <section id="cart" className="section-p1">
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
              return <tr key={cartItem._id}>
                <td>
                  <a href="">
                    <i className="far fa-times-circle"></i>
                  </a>
                </td>
                <td>
                  <img src={`${cartItem?.productIds?.images[0].url}`} alt="" />
                </td>
                <td>{cartItem?.productIds?.name}  --  {cartItem?.productVariantIds?.name}</td>
                <td>${cartItem?.productVariantIds?.price}</td>
                <button className="normal" onClick={() => removeItemCart({ productVariantIds: cartItem?.productVariantIds?._id, token })}>-</button>
                <td>
                  <input type="number" value={`${cartItem?.quantity}`} onChange={(e)=>{
                    console.log(e.target.value);
                    
                  }}/>
                </td>
                <button className="normal" onClick={() => addCart({ productVariantIds: cartItem?.productVariantIds?._id, token })}>+</button>
                <td>${cartItem?.productVariantIds?.price * Number(cartItem?.quantity)}</td>
              </tr>
            })}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="subtotal" className="ttnh">
          <h3>Thông tin nhận hàng</h3>
          <table>
            <tr>
              <input type="text" placeholder="họ tên" />
            </tr>
            <tr>
              <input type="text" placeholder="số điện thoại" />
            </tr>
            <tr>
              <input type="text" placeholder="địa chỉ " />
            </tr>
            <tr>
              <textarea placeholder="ghi chú giao hàng " />
            </tr>
          </table>
          <button className="normal">Proceed to checkout</button>
        </div>

        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>$ 335</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>quantily</td>
              <td>5</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>$ 335</strong>
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
                    type="radio"
                    className="ng-untouched ng-pristine ng-valid"
                  />
                  <label className="radio"></label>
                  <label>
                    <span className="delivery-title">
                      Thanh toán khi nhận hàng
                    </span>
                    <span className="delivery-desc">
                      <p>Trả góp 0% với các ngân hàng liên kết và trả thẳng</p>
                    </span>
                  </label>
                </div>
                <div className="delivery-type-item">
                  <input
                    type="radio"
                    className="ng-untouched ng-pristine ng-valid"
                  />
                  <label className="radio"></label>
                  <label>
                    <span className="delivery-title">
                      Thanh toán tiền mặt tại cửa hàng
                    </span>
                    <span className="delivery-desc">
                      <p>Đang cập nhật nội dung!</p>
                      <div
                        style={{
                          position: "absolute",
                          left: "-74px",
                          top: "-12px",
                        }}
                      >
                        <div className="gtx-trans-icon">&nbsp;</div>
                      </div>
                    </span>
                  </label>
                </div>

              </div>
            </div>
          </div>

          <button className="normal">Proceed to checkout</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
