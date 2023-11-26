import React, { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";
import $ from "jquery";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
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
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    afterChange: () => {
      console.log("Slider initialized!");
    },
  };
  return (
    <div>

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
                                    <h3>Some things simply<br />won’t go out of style</h3>
                                </div>
                                <div className="discount-hover-btn">
                                    <a className="btn-def" href="index.html">Shop Now</a>
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
                                    <h3>Classic<br />Gentalman</h3>
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
                                        <h4>Glasses<br />For summer</h4>
                                    </div>
                                    <div className="discount-right-text-btm">
                                        <a className="" href="#"><span className="">Shop Now</span></a>
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
                                        <h4>Hair<br />Shaving Brush</h4>
                                    </div>
                                    <div className="discount-right-text-btm">
                                        <a className="" href="index.html"><span className="">Shop Now</span></a>
                                    </div>
                                </div>
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
                    <h3>FEATURED PRODUCTS</h3>
                    <img src="../../src/Assets/icon-title.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="product-conttab-wrapper">
                <div className="active-owl-product def-owl row">
                  <Slider {...sliderSettings}>
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
                  </Slider>
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
                      {isLoadingCategories ? (
                        <p>Loading categories...</p>
                      ) : (
                        categories.map((category) => (
                          <div className="categorySlideItem" key={category._id}>
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
