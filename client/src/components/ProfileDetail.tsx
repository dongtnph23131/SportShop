import React, { useState } from "react";

type Props = {};

const ProfileDetail = (props: Props) => {
  const [activeTab, setActiveTab] = useState("profile"); // Sử dụng state để lưu trạng thái tab hiện tại

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName); // Cập nhật trạng thái tab khi click
  };
  const [isAddAddressPopupOpen, setIsAddAddressPopupOpen] = useState(false);

  const openAddAddressPopup = () => {
    setIsAddAddressPopupOpen(true);
  };

  const closeAddAddressPopup = () => {
    setIsAddAddressPopupOpen(false);
  };
  return (
    <div>
      <div className="box__profileDetail">
        <div className="container">
          <h2 className="title__profile">Hi, Lưu Đức Mạnh</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="account__sidebar">
                <a
                  href="#"
                  className={`account__sidebar__item ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("profile")}
                >
                  <div className="icon__sidebar">
                    <img src="../../src/Assets/icon-user.webp" alt="" />
                  </div>
                  Thông tin cá nhân
                </a>
                <a
                  href="#"
                  className={`account__sidebar__item ${
                    activeTab === "history" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("history")}
                >
                  <div className="icon__sidebar">
                    <img src="../../src/Assets/cart__m.webp" alt="" />
                  </div>
                  Sổ địa chỉ
                </a>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="outLet__profile">
                {activeTab === "profile" && (
                  <div className="content__profile">
                    <h3 className="title__profile">Thông tin tài khoản</h3>
                    <div className="profile__name">
                      <div className="full__name">Họ tên:</div>
                      <div className="name__detail">Lưu Đức Mạnh</div>
                    </div>
                    <div className="profile__phone">
                      <div className="full__name">Số điện thoại:</div>
                      <div className="name__detail">0904798514</div>
                    </div>
                    <div className="profile__email">
                      <div className="full__name">Email:</div>
                      <div className="name__detail">
                        Manhld21082003@gmail.com
                      </div>
                    </div>
                    <button className="btn__update update__profile">
                      Cập nhật
                    </button>
                    <div className="content__sign">
                      <h3 className="title__signProfile">
                        Thông tin đăng nhập
                      </h3>
                      <div className="box__detail__sign">
                        <div className="detail__sign__item">
                          <div className="lable">Email:</div>
                          <div className="sign__email">
                            Manhld21082003@gmail.com
                          </div>
                        </div>
                        <div className="detail__sign__item">
                          <div className="lable">Mật khẩu:</div>
                          <div className="sign__passwword">
                            ****************
                          </div>
                        </div>
                        <button className="btn__update update__sign">
                          Cập nhật
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "history" && (
                  <div className="content__profile">
                    <div className="content__top__adress">
                      <h3 className="title__profile">Địa chỉ của tôi</h3>
                      <button
                        className="btn__addAdress"
                        onClick={openAddAddressPopup}
                      >
                        Thêm Địa chỉ
                      </button>
                    </div>
                    {isAddAddressPopupOpen && (
                      <div className="add-address-popup">
                        <div className="main__addAdress">
                          <h3>Thêm Địa chỉ</h3>
                          <form action="">
                            <input type="text" placeholder="Tên" />
                            <input type="text" placeholder="Số điện thoại" />
                            <input type="text" placeholder="Địa chỉ" />
                            <select name="" id="">
                              <option value="">Tỉnh thành</option>
                              <option value="">Hà Nội</option>
                              <option value="">Nghệ An</option>
                            </select>{" "}
                            <select name="" id="">
                              <option value="">Quận / Huyện</option>
                              <option value="">Hà Nội</option>
                              <option value="">Nghệ An</option>
                            </select>
                            <select name="" id="">
                              <option value="">Phường / Xã</option>
                              <option value="">Hà Nội</option>
                              <option value="">Nghệ An</option>
                            </select>
                            <div className="add__default">
                              <input type="checkbox" />
                              <label htmlFor="">Đặt làm địa chỉ mặc định</label>
                            </div>
                            <div className="group__btn__close">
                              <button className="btn__backAdress" onClick={closeAddAddressPopup}>
                                Đóng
                              </button>
                              <button className="btn__addAdr">Thêm</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    <div className="content__bottom__adress">
                      <h3 className="title__profile">Sổ địa chỉ</h3>
                      <div className="account__adress">
                        <div className="left__acount">
                          <div className="name">Lưu Đức Mạnh</div>
                          <div className="adressDefault">
                            <img src="../../src/Assets/star.webp" alt="" />
                            Mặc định
                          </div>
                        </div>
                        <div className="action__adress">
                          <a href="" className="update__adress">
                            Cập nhật
                          </a>
                          <a href="" className="delete__adress">
                            Xóa
                          </a>
                        </div>
                      </div>
                      <div className="account__phone">0904798514</div>
                      <div className="acount__adressDetail">
                        47 Thanh Liệt, Xã Thanh Liệt, Huyện Thanh Trì, Thành phố
                        Hà Nội, Huyện Thanh Trì, Hà Nội
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
