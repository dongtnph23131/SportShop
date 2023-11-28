import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Home = () => {
  const { data: products } = useGetAllProductsQuery({
    sort: "purchases",
    order: "asc",
    dataCategories: [],
    page: 1,
    limit: 8,
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
  const navigate = useNavigate();
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
                                onClick={() => {
                                  navigate(`/products/${product._id}`);
                                }}
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
