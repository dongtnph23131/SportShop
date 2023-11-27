import React, { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";
import $ from "jquery";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Input, InputNumber } from "antd";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data);
        setIsLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoadingCategories(false);
      }
    };

    fetchData();
  }, []);

  interface Category {
    _id: string;
    name: string;
    image: string;
    description?: string;
  }
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false,
    afterChange: () => {
      console.log("Slider initialized!");
    },
  };
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    arrows: false,
    afterChange: () => {
      console.log("Slider initialized!");
    },
  };
  const [isViewProductPopupOpen, setisViewProductPopupOpen] = useState(false);
  const openUpdateProductPopup = () => {
    setisViewProductPopupOpen(true);
  };

  const closeUpdateProductPopup = () => {
    setisViewProductPopupOpen(false);
  };
  return (
    <div>
      
      <div className="banners">
      <Slider {...bannerSettings}>
      <div className="banner__item">
          <img src="../../src/Assets/banner.webp" alt="" />
        </div>
        <div className="banner__item">
          <img src="../../src/Assets/banner.webp" alt="" />
        </div>
      </Slider>
      </div>

      <div className="banner-top hp2-bannertop">
        <div className="container">
          <div className="banner-top-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <div className="single-banner text-center">
                  <div className="banner-icon">
                    <div className="hvr-icon-pulse-grow icon__reload">
                      <i className="zmdi zmdi-refresh-sync"></i>
                    </div>
                  </div>
                  <div className="banner-title-head head__1">
                    <h2>30 Days return</h2>
                  </div>
                  <div className="banner-content">
                    <p>
                      Skinny jeans trouser plaited clashing patterns maxi skirt
                      green Lanvin headscarf. Street style dress printed nails
                      Black 90s button up white shirt knitwear Paris.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <div className="single-banner text-center">
                  <div className="banner-virticle-line posr">
                    <div className="banner-icon">
                      <div className="hvr-icon-pulse-grow icon__reload__2">
                        <i className="zmdi zmdi-boat"></i>
                      </div>
                    </div>
                    <div className="banner-title-head head__2">
                      <h2>30 Days return</h2>
                    </div>
                    <div className="banner-content">
                      <p>
                        Skinny jeans trouser plaited clashing patterns maxi
                        skirt green Lanvin headscarf. Street style dress printed
                        nails Black 90s button up white shirt knitwear Paris.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                <div className="single-banner text-center">
                  <div className="banner-icon">
                    <div className="hvr-icon-pulse-grow icon__reload__3">
                      <i className="zmdi zmdi-lock"></i>
                    </div>
                  </div>
                  <div className="banner-title-head head__3">
                    <h2>30 Days return</h2>
                  </div>
                  <div className="banner-content">
                    <p>
                      Skinny jeans trouser plaited clashing patterns maxi skirt
                      green Lanvin headscarf. Street style dress printed nails
                      Black 90s button up white shirt knitwear Paris.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="middle-discount-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="discount-left-image">
                <div className="single-discount overlay-margin-22 posr">
                  <div className="discount-img">
                    <img src="../../src/Assets/cms1.jpg" alt="" />
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
                    <img src="../../src/Assets/cms2.jpg" alt="domino" />
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
                      <img src="../../src/Assets/cms3.jpg" alt="domino" />
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
                      <img src="../../src/Assets/cms4.jpg" alt="domino" />
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
      </div>
      {isViewProductPopupOpen && (
        <div className="update-profile-popup update-password-popup">
          <div className="main__bodyDetail">
            <div className="modal-body">
              <button
                className="btn__close__views"
                onClick={closeUpdateProductPopup}
              >
                X
              </button>
              <div className="modal-product">
                <div className="product-images">
                  <div className="portfolio-thumbnil-area-2">
                    <div className="tab-content active-portfolio-area-2">
                      <div
                        role="tabpanel"
                        className="tab-pane active"
                        id="view1"
                      >
                        <div className="product-img">
                          <a href="single-product.html">
                            <img
                              src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                              alt="Single portfolio"
                            />
                          </a>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="view2">
                        <div className="product-img">
                          <a href="single-product.html">
                            <img
                              src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                              alt="Single portfolio"
                            />
                          </a>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="view3">
                        <div className="product-img">
                          <a href="single-product.html">
                            <img
                              src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                              alt="Single portfolio"
                            />
                          </a>
                        </div>
                      </div>
                      <div role="tabpanel" className="tab-pane" id="view4">
                        <div className="product-img">
                          <a href="single-product.html">
                            <img
                              src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                              alt="Single portfolio"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="product-more-views-2">
                      <div
                        className="thumbnail-carousel-modal-2"
                        data-tabs="tabs"
                      >
                        <a
                          href="#view1"
                          aria-controls="view1"
                          data-bs-toggle="tab"
                        >
                          <img
                            src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                            alt=""
                          />
                        </a>
                        <a
                          href="#view2"
                          aria-controls="view2"
                          data-bs-toggle="tab"
                        >
                          <img
                            src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                            alt=""
                          />
                        </a>
                        <a
                          href="#view3"
                          aria-controls="view3"
                          data-bs-toggle="tab"
                        >
                          <img
                            src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                            alt=""
                          />
                        </a>
                        <a
                          href="#view4"
                          aria-controls="view4"
                          data-bs-toggle="tab"
                        >
                          <img
                            src="https://i.pinimg.com/564x/09/f0/df/09f0df81a9e264e0f7de6e72deb3ba7f.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h1>Aenean eu tristique</h1>
                  <div className="price-box-3">
                    <div className="s-price-box">
                      {" "}
                      <span className="new-price">$160.00</span>{" "}
                      <span className="old-price">$190.00</span>{" "}
                    </div>
                  </div>{" "}
                  <a href="shop.html" className="see-all">
                    See all features
                  </a>
                  <div className="quick-add-to-cart">
                    <form method="post" className="cart">
                      <div className="numbers-row">
                        <InputNumber value={1}></InputNumber>
                      </div>
                      <button
                        className="single_add_to_cart_button cart-stylei"
                        type="submit"
                      >
                        <i className="fa fa-shopping-cart"></i> Add to cart
                      </button>
                    </form>
                  </div>
                  <div className="quick-desc">
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    fringilla augue nec est tristique auctor. Donec non est at
                    libero.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Nam fringilla augue nec est tristique auctor. Donec
                    non est at libero.Nam fringilla tristique auctor.{" "}
                  </div>
                  <div className="social-sharing-modal">
                    <div className="widget widget_socialsharing_widget">
                      <h3 className="widget-title-modal">Share this product</h3>
                      <ul className="social-icons-modal">
                        <li>
                          <a
                            title="Facebook"
                            href="#"
                            className="facebook m-single-icon"
                          >
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            title="Twitter"
                            href="#"
                            className="twitter m-single-icon"
                          >
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            title="Pinterest"
                            href="#"
                            className="pinterest m-single-icon"
                          >
                            <i className="fa fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            title="Google +"
                            href="#"
                            className="gplus m-single-icon"
                          >
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            title="LinkedIn"
                            href="#"
                            className="linkedin m-single-icon"
                          >
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="new-arrival-product-area hp1-napa pt-60">
        <div className="container">
          <div className="row">
            <div className="product-tab-category-wrapper">
              <div className="col-xs-12">
                <div className="home-product-tab-category text-center">
                  <div className="section-title title-head">
                    <h3>FEATURED PRODUCTS</h3>
                    <img src="../../src/Assets/icon-title.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="product-conttab-wrapper">
                <div className="active-owl-product def-owl row">
                  {products?.map((product: any, index: any) => (
                    <div className="col-md-12 col-lg-3" key={index + 1}>
                      <div className="single-product">
                        <div className="product-wrapper posr">
                          <div className="priduct-img-wrapper posr">
                            <div className="product-img">
                              <a
                                className="btn-def btn-product-qview q-view"
                                data-bs-toggle="modal"
                                data-bs-target=".modal"
                                href="#"
                                onClick={openUpdateProductPopup}
                              >
                                <i className=" product-search fa fa-search"></i>{" "}
                                quick View
                              </a>
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
                                {product.minPrice === product.maxPrice
                                  ? `${product.maxPrice}$`
                                  : `${product.minPrice}$-${product.maxPrice}$`}
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

      <div className="product-banner-area hp2pbanner-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="product-banner-left">
                <div className="pbanner-image hvreff-defm20 posr">
                  <img src="../../src/Assets/cms7.webp" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="product-banner-right">
                <div className="img-banner">
                  <div className="pbanner-image hvreff-defm10 posr">
                    <img src="../../src/Assets/cms9.webp" alt="" />
                  </div>
                </div>
                <div className="img-banner">
                  <div className="pbanner-image hvreff-defm10 posr">
                    <img src="../../src/Assets/cms8.webp" alt="" />
                  </div>
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
                    <h3>Featured categories</h3>
                    <img src="../../src/Assets/icon-title.png" alt="" />
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
                    <div className="active-owl-product categorySlider def-owl ">
                      <Slider {...sliderSettings}>
                        {isLoadingCategories ? (
                          <p>Loading categories...</p>
                        ) : (
                          categories.map((category) => (
                            <div
                              className="categorySlideItem"
                              key={category._id}
                            >
                              <div className="single-product">
                                <div className="product-wrapper posr">
                                  <div className="priduct-img-wrapper posr">
                                    <div className="product-img">
                                      <Link to={`/categories/${category._id}`}>
                                        <img
                                          src={category.image}
                                          alt={category.name}
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="product-bottom-text posr">
                                    <div className="product-bottom-title deft-underline2">
                                      <Link to={`/categories/${category._id}`}>
                                        <h4>{category.name}</h4>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
