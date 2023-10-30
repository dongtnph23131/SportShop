import React, { useState } from "react";
const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };
  const handleHideSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsSearchVisible(false);
  };
  return (
    <div>
      <header>
        {isSearchVisible && (
          <div className="box-search-click">
            <div className="box-allserch container">
              <div className="input-searched">
                <input type="text" placeholder="search..." />
                <button className="remo-search" onClick={handleHideSearch}>
                  X
                </button>
              </div>
              <div className="row">
                <span className="text-searchs">
                  Từ khóa nổi bật ngày hôm nay
                </span>
                <div className="col-lg-3 col-item-3search ">
                  <div className="box-itemsearch">
                    <img src="../../src/Assets/product2.jpg" alt="" />
                    <div className="contentSearch-item">
                      <span className="search-items-name">Product1</span>
                      <button className="search-addCart">buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="header4-main__ctnr ctnr js-between">
          <div className="hd4-left d-flex ai-center js-between">
            <button
              className="hd4-left-left__toggle"
              id="hd4-left-left__toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                className="hd4-left-left__svg"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </button>
            <div className="hd4-left__logo">
              <a href="/home" style={{ color: "black" }}>
                Sports <span>Shop</span>
              </a>
            </div>
            <button
              className="hd4-left-right__toggle"
              id="hd4-left-right__toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
                className="hd4-left-right__svg"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </button>
          </div>
          <div className="hd4-mid flex-1">
            <form action="" className="hd4-mid__search d-flex ai-center">
              <input
                onClick={handleSearchClick}
                type="search"
                placeholder="Tìm sản phẩm, thương hiệu và tên shop"
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </form>
          </div>
          <div className="hd4-right flex-1">
            <ul className="hd4-right__title d-flex js-right ai-center">
              <li className="Login">
                <a href="" id="loginLink">
                  {" "}
                  Đăng nhập / Đăng ký
                </a>
              </li>
              <li>
                <a href="">
                  <span>Giỏ hàng / </span>
                  <span>0 ₫</span>
                  <img src="../../src/Assets/cart.gif" alt="" />
                </a>
                <div className="hd4-cart--dropdown p-absolute row">
                  <div className="img-cart-header-product col-lg-5">
                    <img src="../../src/Assets/b1.jpg" alt="" />
                  </div>
                  <div className="inserts-product-header col-lg-7">
                    <span>
                      Giá : <p>600.000 VND</p>
                    </span>
                    <button className="check-giohangs">
                      <img src="../../src/Assets/cart3.gif" alt="" />
                      Xem giỏ hàng
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="header3-bottom">
          <div className="ctnr">
            <nav>
              <ul className="hd3-navbar__nav p-relative d-flex js-center">
                <li>
                  <a href="">
                    MÔN THỂ THAO
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                  <div className="hd3-sub ctnr p-absolute left-0 w-100"></div>
                </li>
                <li>
                  <a href="">
                    ĐỒ NAM
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                  <div className="hd3-sub ctnr p-absolute left-0 w-100">
                    <ul className="hd3__submenu d-flex fw-wrap">
                      <li>
                        <a href="">MÁY TOÀN ĐẠC LEICA</a>
                      </li>
                      <li>
                        <a href="">MÁY TOÀN ĐẠC NIKON</a>
                      </li>
                      <li>
                        <a href="">MÁY TOÀN ĐẠC SOKKIA</a>
                      </li>
                      <li>
                        <a href="">MÁY TOÀN ĐẠC TOPCON</a>
                      </li>
                      <li>
                        <a href="">MÁY TOÀN ĐẠC GEOMAX</a>
                      </li>
                      <li>
                        <a href="">THUÊ MÁY TOÀN ĐẠC CŨ</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="">
                    ĐỒ NỮ
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                  <div className="hd3-sub ctnr p-absolute left-0 w-100">
                    <ul className="hd3__submenu d-flex fw-wrap">
                      <li>
                        <a href="">MÁY THỦY BÌNH BÁN CHẠY</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH SOKKIA</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH LEICA</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH TOPCON</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH NILON</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH BOSCH</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH PENTAX</a>
                      </li>
                      <li>
                        <a href="">MÁY THỦY BÌNH GEOMAX</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="">
                    ĐỒNG PHỤC
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                  <div className="hd3-sub ctnr p-absolute left-0 w-100">
                    <ul className="hd3__submenu d-flex">
                      <li>
                        <a href="">MÁY ĐỊNH VỊ GPS GARMIN</a>
                      </li>
                      <li>
                        <a href="">MÁY GPS RTK</a>
                        <ul className="hd3-submenu__sub">
                          <li>
                            <a href="">Máy RTK Efix </a>
                          </li>
                          <li>
                            <a href="">Máy RTK Foif</a>
                          </li>
                          <li>
                            <a href="">Máy RTK CHCNAV</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="">
                    GIÀY
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                  <div className="hd3-sub ctnr p-absolute left-0 w-100">
                    <ul className="hd3__submenu d-flex">
                      <li>
                        <a href="">MÁY CÂN BẰNG LASER</a>
                      </li>
                      <li>
                        <a href="">MÁY ĐO KHOẢNG CÁCH SNDWAY</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="">
                    PHỤ KIỆN
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="">
                    LIÊN HỆ
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
