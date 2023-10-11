import React, { useState } from 'react';
// import Login from './Login'


const Header = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); 
    setIsFormVisible(!isFormVisible);
  };
  const toggleForm2 = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    setIsFormVisible(!isFormVisible);
  };

  return (

    <div>
       
        
        <form action="" className={`form-login ${isFormVisible ? 'active' : ''}`}>
            <section className="bivaco-login-1">
                    <div className="ctnr-fluid">
                        <div className="row">
                            <div className="clm bgr-login-1 d-flex w-100 h-100v ai-center js-center">
                                <div className="clone-login">
                                    <a href="" onClick={toggleForm2}>X</a>
                                </div>
                                <div className="sign-in">
                                    <div className="content">
                                        <h5>Sports <span>Shop</span></h5>
                                        <h6 className="ta-center">ĐĂNG KÝ</h6>
                                        <div className="form"> 
                                            <input className="form-group" name="name" type="text" placeholder="Tên" />
                                            <input id="inputPhoneNumber" name="phoneNumber" className="form-group" type="text"  placeholder="Số điện thoại *" />
                                            <input className="form-group" name="email" type="email" placeholder="Email" /> 
                                            <input className="form-group" name="password" type="password"  placeholder="Mật khẩu *" /> 
                                            
                                            <div className="inputBox"> 
                                                <button className="login-btn w-100 fw-600">
                                                    LOGIN
                                                </button>
                                                <button className="login-btn w-100 fw-600">
                                                    REGISTER
                                                </button>
                                            </div> 
                                        </div>
                                        <p>Nếu đã có tài khoản, vui lòng nhập SĐT và mật khẩu để đăng nhập.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </form> 
      

         <header>
         <div className="header4-main__ctnr ctnr js-between">
            <div className="hd4-left d-flex ai-center js-between">
              <button className="hd4-left-left__toggle" id="hd4-left-left__toggle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="hd4-left-left__svg"
                >
                  
                  <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                  />
                </svg>
              </button>
              <div className="hd4-left__logo">
                Sports <span>Shop</span>
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
                  
                  <path
                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                  />
                </svg>
              </button>
            </div>
            <div className="hd4-mid flex-1">
              <form action="" className="hd4-mid__search d-flex ai-center">
                <input
                  type="search"
                  placeholder="Tìm sản phẩm, thương hiệu và tên shop"
                />
                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    />
                  </svg>
                </button>
              </form>
            </div>
            <div className="hd4-right flex-1">
              <ul className="hd4-right__title d-flex js-right ai-center">
                <li className='Login'>
                  <a href=""  id="loginLink" onClick={toggleForm} > Đăng nhập / Đăng ký</a>
                </li>
                <li>
                  <a href="">
                    <span>Giỏ hàng / </span>
                    <span>0 ₫</span>
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShoppingBasketOutlinedIcon">
                                <path d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM12 4.8 14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                            </svg>
                  </a>
                  <ul className="hd4-cart--dropdown p-absolute">
                    <li>
                      <p>Chưa có sản phẩm trong giỏ hàng.</p>
                    </li>
                  </ul>
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
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </a>
                <div className="hd3-sub ctnr p-absolute left-0 w-100">
                  <ul className="hd3__submenu d-flex">
                    <li>
                      <a href="">MÁY KINH VĨ</a>
                    </li>
                    <li>
                      <a href="">BỘ ĐÀM</a>
                      <ul className="hd3-submenu__sub">
                        <li>
                          <a href="">Bộ Đàm JBL</a>
                        </li>
                        <li>
                          <a href=""> Bộ Đàm Motorola </a>
                        </li>
                        <li>
                          <a href=""> Bộ Đàm Kenwood </a>
                        </li>
                        <li>
                          <a href=""> Bộ Đàm Spender </a>
                        </li>
                        <li>
                          <a href=""> Bộ Đàm HYT </a>
                        </li>
                        <li>
                          <a href=""> Bộ Đàm Icom </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="">PHỤ KIỆN TRẮC ĐỊA</a>
                      <ul className="hd3-submenu__sub">
                        <li>
                          <a href="">Thước Dây - Thước Cuộn - Thước Thép</a>
                        </li>
                        <li>
                          <a href="">Bánh Xe Đo Khoảng Cách</a>
                        </li>
                        <li>
                          <a href="">Hòm - Chân - Đế Máy</a>
                        </li>
                        <li>
                          <a href="">Gương Sào Kẹp Máy Toàn Đạc</a>
                        </li>
                        <li>
                          <a href="">Mia - Mốc - Bọt Thủy</a>
                        </li>
                        <li>
                          <a href="">Pin - Sạc - Adapter</a>
                        </li>
                        <li>
                          <a href="">Cáp USB Trút Dữ Liệu Máy Toàn Đạc</a>
                        </li>
                        <li>
                          <a href="">Phụ Kiện Khác</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href=""
                  >ĐỒ NAM

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
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
                <a href=""
                  >ĐỒ NỮ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
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
                <a href=""
                  >ĐỒNG PHỤC
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
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
                <a href=""
                  >GIÀY
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
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
                <a href=""
                  >
                  PHỤ KIỆN
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </a>
                <ul className="hd3__submenu2 p-absolute">
                  <li>
                    <a href="">Cho Thuê Máy Trắc Địa</a>
                  </li>
                  <li>
                    <a href="">Thuê Máy Toàn Đạc Điện Tử</a>
                  </li>
                  <li>
                    <a href="">Sửa Máy Thủy Bình Giá Rẻ</a>
                  </li>
                  <li>
                    <a href="">Sửa Chữa Máy Trắc Địa</a>
                  </li>
                  <li>
                    <a href="">Kiểm Định Máy Trắc Địa</a>
                  </li>
                  <li>
                    <a href="">Cho Thuê GNSS RTK</a>
                  </li>
                  <li>
                    <a href="">Khóa Học Đào Tạo Sử Dụng Máy Toàn Đạc Hà Nội</a>
                  </li>
                  <li>
                    <a href="">Chính Sách Vận Chuyển Và Trả Hàng - Bảo Hành</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href=""
                  >LIÊN HỆ
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </a>
                <ul className="hd3__submenu2 p-absolute">
                  <li>
                    <a href="">Bài Viết Về Máy Thủy Bình</a>
                  </li>
                  <li>
                    <a href="">Bài Viết Về Máy Toàn Đạc</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
        </header>


    </div>
  )
  
}

export default Header
