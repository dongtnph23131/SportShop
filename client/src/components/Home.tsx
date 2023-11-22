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
