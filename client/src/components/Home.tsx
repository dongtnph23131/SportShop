import React, { useState } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sort, setSort] = useState<String>();
  const [order, setOrder] = useState<String>();
  const [page, setPage] = useState<any>(1);
  const [dataCategories, setDataCategories] = useState<any>([]);
  const navigate = useNavigate();
  const { data: products, isLoading: isLoadingProducts } =
    useGetAllProductsQuery({
      sort,
      order,
      dataCategories,
      page,
      limit: 12,
    });
  const { data: productsNoPage } = useGetAllProductsQuery({
    sort,
    order,
    dataCategories,
  });
  return (
    <div>
      {/* <section id="hero"></section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="../../src/Assets/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f2.png" alt="" />
          <h6>Onine Order</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src="../../src/Assets/f6.png" alt="" />
          <h6>F24/Support</h6>
        </div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Tất cả sản phẩm</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          {products?.map((product: any, index: any) => {
            return (
              <div
                onClick={() => {
                  navigate(`/products/${product._id}`);
                }}
                className="pro"
                key={index + 1}
              >
                <img src={`${product?.images[0].url}`} alt="" />
                <div className="des">
                  <span>adidas</span>
                  <h5>{product.name}</h5>
                  <div className="star">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>
                    ${product.minPrice}-${product.maxPrice}
                  </h4>
                </div>
                <a href="#">
                  <i className="fab fa-opencart cart"></i>
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>
          Up to <span>70% Off</span> - All t-shirts & Accessories
        </h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="product1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Summer Collection New Modern Design</p>
        <div className="pro-container">
          <div className="pro">
            <img src="../../src/Assets/product33.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5>Cartoon Astronaut T-Shirts</h5>
              <div className="star">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <h4>$78</h4>
            </div>
            <a href="#">
              <i className="fal fa-shopping-cart cart"></i>
            </a>
          </div>
        </div>
      </section>

      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Learn More</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>spring/summer</h4>
          <h2>upcoming season</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Collection</button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner-box">
          <h2>SEASONAL SALE</h2>
          <h3>Winter Collection - 50% OFF</h3>
        </div>
        <div className="banner-box banner-box2">
          <h2>NEW FOOTWEAR COLLECTION</h2>
          <h3>Spring / Summer 2022</h3>
        </div>
        <div className="banner-box banner-box3">
          <h2>T-SHIRTS</h2>
          <h3>New Trendy Prints</h3>
        </div>
      </section> */}

      {/* <div className="free-offer ptb-95">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="free-offer-wrapper free-border">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-free-offer text-center">
                      <div className="title-head">
                        <h4>FREE UK DELIVERY</h4>
                      </div>
                      <div className="free-offer-text">
                        <p>International Delivery Available</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-free-offer def-virticle-line posr text-center">
                      <div className="title-head">
                        <h4>FREE PRESCRIPTION LENSES</h4>
                      </div>
                      <div className="free-offer-text">
                        <p>*Save Up To £106 On Your Lenses</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-free-offer def-virticle-line posr text-center">
                      <div className="title-head">
                        <h4>QUALIFIED OPTICIANS</h4>
                      </div>
                      <div className="free-offer-text">
                        <p>Prescription Experts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="middle-discount-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="discount-left-image">
                <div className="single-discount overlay-margin-22 posr">
                  <div className="discount-img">
                    <img
                      src="https://salt.tikicdn.com/ts/product/e4/a8/c8/1737ab5b4e243fdca447bfc2da96de08.png"
                      alt=""
                    />
                  </div>
                  <div className="discount-text">
                    <div className="discount-hover-text def-underline posr">
                      <h4>Sale up to 70% off</h4>
                    </div>
                    <div className="discount-hover-desc desc-head-text uppercase">
                      <h3>
                        Some things simply
                        <br />
                        won’t go out of style
                      </h3>
                    </div>
                    <div className="discount-hover-btn">
                      <a className="btn-def" href="index.html">
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="discout-middle-image hp1-dmimage">
                <div className="single-middle-discount overlay-margin-10 posr">
                  <div className="discount-middle-img">
                    <img
                      src="https://salt.tikicdn.com/ts/product/e4/a8/c8/1737ab5b4e243fdca447bfc2da96de08.png"
                      alt="domino"
                    />
                  </div>
                  <div className="discount-middle-text">
                    <div className="discount-middle-text-top">
                      <h4>New Arrival</h4>
                    </div>
                    <div className="discount-middle-text-btm">
                      <h3>
                        Classic
                        <br />
                        Gentalman
                      </h3>
                    </div>
                  </div>
                  <div className="discount-round-btn round-btn">
                    <a className="" href="index.html">
                      <span className="upto">Up to</span>
                      <br />
                      <span className="sixtynine">69%</span>
                      <br />
                      <span className="off">off</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="discount-right-wrapper hp1-dmimage">
                <div className="discout-right-top-image">
                  <div className="single-right-top overlay-margin-10 posr">
                    <div className="discount-right-img">
                      <img
                        src="https://salt.tikicdn.com/ts/product/e4/a8/c8/1737ab5b4e243fdca447bfc2da96de08.png"
                        alt="domino"
                      />
                    </div>
                    <div className="discount-right-text">
                      <div className="discount-right-text-top">
                        <h4>
                          Glasses
                          <br />
                          For summer
                        </h4>
                      </div>
                      <div className="discount-right-text-btm">
                        <a className="" href="#">
                          <span className="">Shop Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="discout-right-top-image hp1-dmimage">
                  <div className="single-right-top overlay-margin-10 posr">
                    <div className="discount-right-img">
                      <img
                        src="https://salt.tikicdn.com/ts/product/e4/a8/c8/1737ab5b4e243fdca447bfc2da96de08.png"
                        alt="domino"
                      />
                    </div>
                    <div className="discount-right-text">
                      <div className="discount-right-text-top">
                        <h4>
                          Hair
                          <br />
                          Shaving Brush
                        </h4>
                      </div>
                      <div className="discount-right-text-btm">
                        <a className="" href="index.html">
                          <span className="">Shop Now</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="new-arrival-product-area hp1-napa pt-60">
        <div className="container">
          <div className="row">
            <div className="product-tab-category-wrapper">
              <div className="col-xs-12">
                <div className="home-product-tab-category text-center">
                  <div className="section-title title-head">
                    <h3>Our Products</h3>
                    <img src="images/icons/icon-title.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="product-conttab-wrapper">
                <div className="active-owl-product def-owl row">
                  {products?.map((product: any, index: any) => (
                    <div className="col-md-3" key={index + 1}>
                      <div className="single-product">
                        <div className="product-wrapper posr">
                          <div className="priduct-img-wrapper posr">
                            <div className="product-img">
                              <a href={`/products/${product._id}`}>
                                <img
                                  src={`${product?.images[0].url}`}
                                  alt={product.name}
                                />
                              </a>
                            </div>
                          </div>
                          <div className="product-bottom-text posr">
                            <div className="product-bottom-title deft-underline2">
                              <a
                                href={`/products/${product._id}`}
                                title={product.name}
                              >
                                <h4>{product.name}</h4>
                              </a>
                            </div>
                            <div className="product-bottom-price">
                              <span>
                                ${product.minPrice}-${product.maxPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="center-banner-area hp1-center-banner">
        <div className="center-banner">
          <div className="banner-left-wrapper">
            <div className="banner-text-wrapper top-bg">
              <div className="banner-text-top text-center">
                <div className="collection-title title-top title-head">
                  <h3>liber tempor cum soluta</h3>
                </div>
                <div className="content-top content-area-comm">
                  <p>
                    Aenean commodo ligula eget dolor Aenean massa. Portals seize
                    data-driven, tag expedite.
                  </p>
                </div>
                <div className="collection-btn btn-area-comm">
                  <a className="btn-def-black" href="#">
                    See Collection
                  </a>
                </div>
              </div>
            </div>
            <div className="banner-image">
              <div className="collection-single-box-img">
                <div className="collection-right-img">
                  <a href="#">
                    <img src="images/middle/m2.jpg" alt="domino" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-right-wrapper">
            <div className="banner-image">
              <div className="collection-single-box-img">
                <div className="collection-right-img">
                  <a href="#">
                    <img src="images/middle/m1.jpg" alt="domino" />
                  </a>
                </div>
              </div>
            </div>
            <div className="banner-text-wrapper bottom-bg">
              <div className="banner-text-bottom text-center">
                <div className="collection-title title-bottom title-head">
                  <h3>Typi non habent</h3>
                </div>
                <div className="content-bottom content-area-comm">
                  <p>
                    Aenean commodo ligula eget dolor Aenean massa. Portals seize
                    data-driven, tag expedite.
                  </p>
                </div>
                <div className="collection-btn btn-area-comm">
                  <a className="btn-def btn-def-white" href="#">
                    See Collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="new-arrival-product-area hp1-napa pt-60">
        <div className="container">
          <div className="row">
            <div className="product-tab-category-wrapper">
              <div className="col-xs-12">
                <div className="home-product-tab-category text-center">
                  <div className="section-title title-head">
                    <h3>Featured Products</h3>
                    <img src="images/icons/icon-title.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="product-conttab-wrapper">
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane show active"
                    id="newArrival"
                    aria-labelledby="tab1"
                  >
                    <div className="active-owl-product def-owl row">
                      {products?.map((product: any, index: any) => (
                        <div className="col-md-3" key={index + 1}>
                          <div className="single-product">
                            <div className="product-wrapper posr">
                              <div className="priduct-img-wrapper posr">
                                <div className="product-img">
                                  <a href={`/products/${product._id}`}>
                                    <img
                                      src={`${product?.images[0].url}`}
                                      alt={product.name}
                                    />
                                  </a>
                                </div>
                                <div className="product-inner-text">
                                  <div className="product-btn">
                                    <div className="product-qview-search">
                                      <a
                                        className="btn-def btn-product-qview q-view"
                                        data-bs-toggle="modal"
                                        data-bs-target=".modal"
                                        href="#"
                                      >
                                        <i className=" product-search fa fa-search"></i>{" "}
                                        quick View
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="product-review">
                                <ul className="light-color"></ul>
                              </div>
                              <div className="product-bottom-text posr">
                                <div className="product-bottom-title deft-underline2">
                                  <a
                                    href={`/products/${product._id}`}
                                    title={product.name}
                                  >
                                    <h4>{product.name}</h4>
                                  </a>
                                </div>
                                <div className="product-bottom-price">
                                  <span>
                                    ${product.minPrice}-${product.maxPrice}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="home-email-area hp1-email-area">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="email-text-wrapper">
                <div className="section-title title-head">
                  <h3>Sign up for send newsletter</h3>
                </div>
                <div className="email-small-text">
                  <p>
                    Join over 1,000 people who get free and fresh content
                    delivered automatically each time we publish.
                  </p>
                </div>
                <form action="#">
                  <div className="email-input">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="email-btn">
                    <button type="submit" value="">
                      <span>Sign up</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
