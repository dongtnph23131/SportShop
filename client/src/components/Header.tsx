import "../../../client/src/Assets/CSS/responsive.css";
import "../../../client/src/Assets/CSS/style.css";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCategories } from "../api/category";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useGetCartOfUserQuery } from "../api/cart";
import { useGetProfileByAcountQuery } from "../api/acount";
const Header = () => {
  const [token, setToken] = useState<any>(Cookies.get("token"));
  const { data: profile } = useGetProfileByAcountQuery(token);
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [productSearch, setProductSearch] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: carts } = useGetCartOfUserQuery(token);
  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };
  const handleHideSearch = (e: any) => {
    e.preventDefault();
    setIsSearchVisible(false);
  };
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);
  return (
    // <div>
    //   <header>
    //     {isSearchVisible && (
    //       <div className="box-search-click">
    //         <div className="box-allserch container">
    //           <div className="input-searched">
    //             <input
    //               type="text"
    //               placeholder="search..."
    //               onChange={async (event) => {
    //                 if (event.target.value != "") {
    //                   setIsLoading(true);
    //                   await axios
    //                     .get(
    //                       `http://localhost:8080/api/products?q=${
    //                         event.target.value ? event.target.value : ""
    //                       }`
    //                     )
    //                     .then((data) => {
    //                       setProductSearch(data.data);
    //                     });
    //                   setIsLoading(false);
    //                 } else {
    //                   setProductSearch([]);
    //                 }
    //               }}
    //             />
    //             <button className="remo-search" onClick={handleHideSearch}>
    //               X
    //             </button>
    //           </div>
    //           <div className="row">
    //             {productSearch.length === 0 ? (
    //               <span className="text-searchs">
    //                 Hãy nhập nội dung tìm kiếm
    //               </span>
    //             ) : (
    //               ""
    //             )}
    //             {productSearch?.map((item: any) => {
    //               return (
    //                 <div
    //                   onClick={() => {
    //                     navigate(`/products/${item._id}`);
    //                     setIsSearchVisible(false);
    //                     setProductSearch([]);
    //                   }}
    //                   className="col-lg-3 col-item-3search "
    //                 >
    //                   <div key={item._id} className="box-itemsearch">
    //                     <img src={`${item.images[0].url}`} alt="" />
    //                     <div className="contentSearch-item">
    //                       <span className="search-items-name">{item.name}</span>
    //                       <button className="search-addCart">buy</button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     <div className="header4-main__ctnr ctnr js-between">
    //       <div className="hd4-left d-flex ai-center js-between">
    //         <button
    //           className="hd4-left-left__toggle"
    //           id="hd4-left-left__toggle"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             height="1em"
    //             viewBox="0 0 448 512"
    //             className="hd4-left-left__svg"
    //           >
    //             <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
    //           </svg>
    //         </button>
    //         <div className="hd4-left__logo">
    //           <a href="/home" style={{ color: "black" }}>
    //             Sports <span>Shop</span>
    //           </a>
    //         </div>
    //         <button
    //           className="hd4-left-right__toggle"
    //           id="hd4-left-right__toggle"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             height="1em"
    //             viewBox="0 0 576 512"
    //             className="hd4-left-right__svg"
    //           >
    //             <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
    //           </svg>
    //         </button>
    //       </div>
    //       <div className="hd4-mid flex-1">
    //         <form action="" className="hd4-mid__search d-flex ai-center">
    //           <div className="iputed-search" onClick={handleSearchClick}>
    //             Tìm kiếm ...
    //           </div>
    //           <button type="submit">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               height="1em"
    //               viewBox="0 0 512 512"
    //             >
    //               <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    //             </svg>
    //           </button>
    //         </form>
    //       </div>
    //       <div className="hd4-right flex-1">
    //         <ul className="hd4-right__title d-flex js-right ai-center">
    //           {token ? (
    //             <>
    //               <li className="signin-up">
    //                 <div
    //                   className="clickViewsProfile"
    //                   onClick={() => setIsDropdownActive(!isDropdownActive)}
    //                 >
    //                   <div className="avart-sgin">
    //                     <img src={profile?.customer?.avatar} alt="" />
    //                   </div>
    //                   <a className="nameProfileUser">
    //                     {profile?.customer?.firstName}{" "}
    //                     {profile?.customer?.lastName}{" "}
    //                     <span
    //                       className={`icon__down__detailProfile ${
    //                         isDropdownActive ? "active" : ""
    //                       }`}
    //                     >
    //                       <i className="fa-solid fa-caret-down"></i>
    //                     </span>
    //                   </a>
    //                 </div>
    //                 <ul
    //                   className={`all-signinout ${
    //                     isDropdownActive ? "active" : ""
    //                   }`}
    //                 >
    //                   <li>
    //                     <a href="/profileDetail" className="detail__profile">
    //                       Thông tin cá nhân{" "}
    //                       <span>
    //                         <i className="fa-solid fa-user"></i>
    //                       </span>
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a href="/orderClient" className="detail__profile">
    //                       Lịch sử đơn hàng
    //                       {/* <span>
    //                         <i className="fa-solid fa-user"></i>
    //                       </span> */}
    //                     </a>
    //                   </li>
    //                   <li>
    //                     <a
    //                       onClick={() => {
    //                         Cookies.remove("email");
    //                         Cookies.remove("firstName");
    //                         Cookies.remove("lastName");
    //                         Cookies.remove("avatar");
    //                         Cookies.remove("token");
    //                         setToken("");
    //                         navigate("/");
    //                       }}
    //                       className="detail__profile"
    //                     >
    //                       Đăng xuất{" "}
    //                       <span>
    //                         <i className="fa-solid fa-right-from-bracket"></i>
    //                       </span>
    //                     </a>
    //                   </li>
    //                 </ul>
    //               </li>
    //               <li className="Login"></li>
    //             </>
    //           ) : (
    //             <>
    //               <li className="Login">
    //                 <a href="/signin" id="loginLink">
    //                   {" "}
    //                   Đăng nhập
    //                 </a>
    //               </li>
    //               <li className="Login">
    //                 <a href="/signup" id="signupLink">
    //                   {" "}
    //                   / Đăng ký
    //                 </a>
    //               </li>
    //             </>
    //           )}
    //           {token ? (
    //             <li>
    //               <a href="/cart" className="qtyli-cart">
    //                 <span className="qlty">
    //                   {token
    //                     ? carts?.reduce(
    //                         (accumulator: any, currentValue: any) =>
    //                           accumulator + currentValue.quantity,
    //                         0
    //                       )
    //                     : "0"}
    //                 </span>
    //                 <img src="../../src/Assets/cart.gif" alt="" />
    //               </a>
    //             </li>
    //           ) : (
    //             <li>
    //             <a href="/cart" className="qtyli-cart">
    //               <span className="qlty">
    //                 0
    //               </span>
    //               <img src="../../src/Assets/cart.gif" alt="" />
    //             </a>
    //           </li>
    //           )}
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="header3-bottom">
    //       <div className="ctnr">
    //         <nav>
    //           <ul className="hd3-navbar__nav p-relative d-flex js-center">
    //             <li>
    //               <a href="/shops">
    //                 All
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   height="1em"
    //                   viewBox="0 0 512 512"
    //                 >
    //                   <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
    //                 </svg>
    //               </a>
    //               <div className="hd3-sub ctnr p-absolute left-0 w-100"></div>
    //             </li>
    //             {categories?.map((category: any) => {
    //               return (
    //                 <li key={category?._id}>
    //                   <a href={`/categories/${category._id}`}>
    //                     {category.name}
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       height="1em"
    //                       viewBox="0 0 512 512"
    //                     >
    //                       <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
    //                     </svg>
    //                   </a>
    //                   <div className="hd3-sub ctnr p-absolute left-0 w-100"></div>
    //                 </li>
    //               );
    //             })}
    //           </ul>
    //         </nav>
    //       </div>
    //     </div>
    //   </header>
    // </div>
    <div className="header-area">
      <div className="header-topbar-area-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="header-login posr">
                <ul>
                  <li>
                    <a>My Account</a>
                  </li>
                  <li>
                    <a>My wishlist</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="header-currency-area">
                <ul>
                  <li>
                    <div className="header-currency">
                      <div className="currency-dd posr">
                        <div className="cur-title1 currency-ttl">
                          <div className="cur-usd">
                            <span>Currency : USD</span>
                            <a href="#">
                              <i className="zmdi zmdi-chevron-down"></i>
                            </a>
                          </div>
                          <div className="cur-text-wrapper cur-cury inner-btn currency-opt">
                            <div className="inner-text">
                              <span className="usd">
                                <a href="#">Dollar(USD)</a>
                              </span>
                            </div>
                            <div className="inner-text">
                              <span className="cbp">
                                <a href="#">Pound(CBP)</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="header-currency">
                      <div className="currency-dd posr">
                        <div className="cur-title2 currency-ttl">
                          <div className="cur-usd">
                            <span>English</span>
                            <a href="#">
                              <i className="zmdi zmdi-chevron-down"></i>
                            </a>
                          </div>
                          <div className="cur-text-wrapper cur-lanpos inner-btn2 currency-opt">
                            <div className="inner-text">
                              <span className="usd">
                                <a href="#">English</a>
                              </span>
                            </div>
                            <div className="inner-text">
                              <span className="cbp">
                                <a href="#">Arabic</a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12">
              <ul className="header-social-icon text-center text-md-end">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-envelope"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div style={{ marginTop: "12px" }}>
                <img
                  src="../../src/Assets/sport-shop-logo.svg"
                  alt=""
                  width={180}
                  height={180}
                />
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="header-whishlist">
                <div className="header-whish-compare posr">
                  <div className="header-whish">
                    <a>My Wishlist</a>
                  </div>
                  <div className="header-compare">
                    <a>Compare</a>
                  </div>
                </div>
                <div className="header-middle-phone">
                  <span>
                    <i className="fa fa-phone"></i>1-888-123-456-89
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="sticky-header" className="main-menu-wrapper hp1-menu">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-10 hidden-sm">
              <nav>
                <ul className="main-menu">
                  <li className="active">
                    <a href="/Home">
                      Home <i className="zmdi zmdi-chevron-down"></i>
                    </a>
                  </li>
                  <li className="mega-parent">
                    <a href="/shops">
                      Shop <i className="zmdi zmdi-chevron-down"></i>
                    </a>
                    <div className="mega-menu-area hp1-style1">
                      <ul className="single-mega-item mega-underline1 mega-underline3">
                        {categories?.map((category: any) => (
                          <li className="mega-title" key={category?._id}>
                            <a href={`/categories/${category._id}`}>
                              {category.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {categories?.map((category: any) => (
                    <li className="mega-parent" key={category?._id}>
                      <a href={`/categories/${category._id}`}>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="col-lg-3 col-md-2 col-sm-12">
              <div className="main-cart-area  cart-sticky-display posr">
                <div className="hd4-mid wrapSearch ">
                  {isSearchVisible && (
                    <div className="box-search-click">
                      <div className="box-allserch container">
                        <div className="input-searched">
                          <input
                            type="text"
                            placeholder="search..."
                            onChange={async (event) => {
                              if (event.target.value != "") {
                                setIsLoading(true);
                                await axios
                                  .get(
                                    `http://localhost:8080/api/products?q=${
                                      event.target.value
                                        ? event.target.value
                                        : ""
                                    }`
                                  )
                                  .then((data) => {
                                    setProductSearch(data.data);
                                  });
                                setIsLoading(false);
                              } else {
                                setProductSearch([]);
                              }
                            }}
                          />
                          <button
                            className="remo-search"
                            onClick={handleHideSearch}
                          >
                            X
                          </button>
                        </div>
                        <div className="row">
                          {productSearch.length === 0 ? (
                            <span className="text-searchs">
                              Hãy nhập nội dung tìm kiếm
                            </span>
                          ) : (
                            ""
                          )}
                          {productSearch?.map((item: any) => {
                            return (
                              <div
                                onClick={() => {
                                  navigate(`/products/${item._id}`);
                                  setIsSearchVisible(false);
                                  setProductSearch([]);
                                }}
                                className="col-lg-3 col-item-3search "
                              >
                                <div key={item._id} className="box-itemsearch">
                                  <img src={`${item.images[0].url}`} alt="" />
                                  <div className="contentSearch-item">
                                    <span className="search-items-name">
                                      {item.name}
                                    </span>
                                    <button className="search-addCart">
                                      buy
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  <form action="" className="hd4-mid__search">
                    <div
                      className="search__desktop"
                      onClick={() => {
                        handleSearchClick();
                        setProductSearch([]);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                      </svg>
                    </div>
                  </form>
                </div>
                <div className="hd4-right flex-1">
                  <ul className="hd4-right__title d-flex js-right ai-center">
                    {token ? (
                      <>
                        <li className="signin-up">
                          <div
                            className="clickViewsProfile"
                            onClick={() =>
                              setIsDropdownActive(!isDropdownActive)
                            }
                          >
                            <div className="avart-sgin">
                              <img src={profile?.customer?.avatar} alt="" />
                            </div>
                            <a className="nameProfileUser">
                              {profile?.customer?.firstName}{" "}
                              {profile?.customer?.lastName}{" "}
                              <span
                                className={`icon__down__detailProfile ${
                                  !isDropdownActive ? "active" : ""
                                }`}
                              >
                                <i className="fa-solid fa-caret-down"></i>
                              </span>
                            </a>
                          </div>
                          <ul
                            className={`all-signinout ${
                              isDropdownActive ? "active" : ""
                            }`}
                          >
                            <li>
                              <a
                                href="/profileDetail"
                                className="detail__profile"
                              >
                                Thông tin cá nhân{" "}
                                <span>
                                  <i className="fa-solid fa-user"></i>
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="/orderClient"
                                className="detail__profile"
                              >
                                Lịch sử đơn hàng
                                <span>
                                  <i className="fa-regular fa-rectangle-list"></i>
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() => {
                                  Cookies.remove("email");
                                  Cookies.remove("firstName");
                                  Cookies.remove("lastName");
                                  Cookies.remove("avatar");
                                  Cookies.remove("token");
                                  setToken("");
                                  navigate("/");
                                }}
                                className="detail__profile"
                              >
                                Đăng xuất{" "}
                                <span>
                                  <i className="fa-solid fa-right-from-bracket"></i>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="Login"></li>
                      </>
                    ) : (
                      <>
                        <li className="Login">
                          <a href="/signin" id="loginLink">
                            {" "}
                            Đăng nhập
                          </a>
                        </li>
                        <li className="Login">
                          <a href="/signup" id="signupLink">
                            {" "}
                            / Đăng ký
                          </a>
                        </li>
                      </>
                    )}
                    {token ? (
                      <li>
                        <a href="/cart" className="qtyli-cart">
                          <span className="qlty">
                            {token
                              ? carts?.reduce(
                                  (accumulator: any, currentValue: any) =>
                                    accumulator + currentValue.quantity,
                                  0
                                )
                              : "0"}
                          </span>
                          <img src="../../src/Assets/cart.gif" alt="" />
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a href="/cart" className="qtyli-cart">
                          <span className="qlty">0</span>
                          <img src="../../src/Assets/cart.gif" alt="" />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu-area hp1-mobile-area">
          <div className="container mean-container">
            <div className="mean-bar">
              <a
                href="#nav"
                className="meanmenu-reveal"
                style={{ background: "", color: "", right: 0, left: "auto" }}
              >
                <span></span>
                <span></span>
                <span></span>
              </a>
              <nav className="mean-nav">
                <ul style={{ display: "none" }}>
                  <li>
                    <a href="index.html">Home</a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <a href="index.html">Home-1</a>
                      </li>
                      <li>
                        <a href="index2.html">Home-2</a>
                      </li>
                      <li>
                        <a href="index3.html">Home-3</a>
                      </li>
                      <li>
                        <a href="index4.html">Home-4</a>
                      </li>
                      <li>
                        <a href="index5.html">Home-5</a>
                      </li>
                      <li>
                        <a href="index6.html">Home-6</a>
                      </li>
                      <li className="lastli">
                        <a href="index7.html">Home-7</a>
                      </li>
                    </ul>
                    <a className="mean-expand" href="#">
                      +
                    </a>
                  </li>
                  <li>
                    <a href="shop.html">Shop</a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <a href="#">Shop Layouts</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="shop-fullwidth.html">Fullwidth</a>
                          </li>
                          <li>
                            <a href="shop.html">Sidebar Left</a>
                          </li>
                          <li>
                            <a href="shop-right-sidebar.html">Sidebar right</a>
                          </li>
                          <li>
                            <a href="shop-list-view.html">List View</a>
                          </li>
                          <li>
                            <a href="shop-list-view-right.html">
                              List View right
                            </a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                      <li>
                        <a href="#">Shop Pages</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="shop.html">Category</a>
                          </li>
                          <li>
                            <a href="my-account.html">My Account</a>
                          </li>
                          <li>
                            <a href="wishlist.html">Wishlist</a>
                          </li>
                          <li>
                            <a href="cart.html">Shopping Cart</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                      <li>
                        <a href="#">Product Types</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="single-product.html">Single Product</a>
                          </li>
                          <li>
                            <a href="shop.html">Variable Product</a>
                          </li>
                          <li>
                            <a href="shop.html">Group Product</a>
                          </li>
                          <li>
                            <a href="shop.html">External Product</a>
                          </li>
                          <li>
                            <a href="shop.html">New Product</a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                    </ul>
                    <a className="mean-expand" href="#">
                      +
                    </a>
                  </li>
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="portfolio.html">Portfolio</a>
                  </li>

                  <li>
                    <a href="blog.html">Blog</a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <a href="blog-right-sidebar.html">Right Sidebar</a>
                      </li>
                      <li>
                        <a href="blog-fullwidth.html">Fullwidth</a>
                      </li>
                      <li>
                        <a href="single-blog-video.html">Single Video</a>
                      </li>
                      <li>
                        <a href="single-blog-audio.html">Single Audio</a>
                      </li>
                      <li>
                        <a href="single-blog-slider.html">Single Gallery</a>
                      </li>
                      <li>
                        <a href="single-blog.html">Single Image</a>
                      </li>
                    </ul>
                    <a className="mean-expand" href="#">
                      +
                    </a>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul style={{ display: "none" }}>
                      <li>
                        <a href="#">Pages-01</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="about.html">About us</a>
                          </li>
                          <li>
                            <a href="404.html">Page 404</a>
                          </li>
                          <li>
                            <a href="portfolio.html">Portfolio</a>
                          </li>
                          <li>
                            <a href="portfolio2.html">Portfolio2</a>
                          </li>
                          <li>
                            <a href="single-product-2.html">Single Product</a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                      <li>
                        <a href="#">Pages-02</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="blog-right-sidebar.html">Right Sidebar</a>
                          </li>
                          <li>
                            <a href="single-blog-video.html">Single Video</a>
                          </li>
                          <li>
                            <a href="single-blog-audio.html">Single Audio</a>
                          </li>
                          <li>
                            <a href="single-blog-slider.html">Single Gallery</a>
                          </li>
                          <li>
                            <a href="single-blog.html">Single Image</a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                      <li>
                        <a href="#">Pages-03</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="cart.html">Cart</a>
                          </li>
                          <li>
                            <a href="address.html">Address</a>
                          </li>
                          <li>
                            <a href="checkout.html">Checkout</a>
                          </li>
                          <li>
                            <a href="payment.html">Payment</a>
                          </li>
                          <li>
                            <a href="shipping.html">Shipping</a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                      <li>
                        <a href="#">Pages-04</a>
                        <ul style={{ display: "none" }}>
                          <li>
                            <a href="my-account.html">My Account</a>
                          </li>
                          <li>
                            <a href="wishlist.html">Wishlist</a>
                          </li>
                          <li>
                            <a href="login.html">login</a>
                          </li>
                          <li>
                            <a href="shop.html">Dresses</a>
                          </li>
                          <li>
                            <a href="shop.html">T-Shirts</a>
                          </li>
                        </ul>
                        <a className="mean-expand" href="#">
                          +
                        </a>
                      </li>
                    </ul>
                    <a className="mean-expand" href="#">
                      +
                    </a>
                  </li>
                  <li className="mean-last">
                    <a href="contact.html">Contact Us</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
