import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
const Home = () => {
  const { data: products } = useGetAllProductsQuery({
    sort: "purchases",
    order: "desc",
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
    afterChange: () => {},
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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

  const [banners, setBanners] = useState([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getBanners"
        );
        setBanners(response.data);
        setIsLoadingBanners(false);
      } catch (error) {
        setIsLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);
  const formatPrice = (price: any) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return formattedPrice;
  };
  return (
    <div>
      <div className="banners">
        <Slider {...bannerSettings}>
          {isLoadingBanners ? (
            <p>Đang tải banners...</p>
          ) : (
            banners.map((banner: any, index) => (
              <div className="banner__item" key={index + 1}>
                <img src={banner.image} alt={banner.name} />
              </div>
            ))
          )}
        </Slider>
      </div>
      <div className="new-arrival-product-area hp1-napa pt-60">
        <div className="container">
          <div className="row">
            <div className="product-tab-category-wrapper">
              <div className="col-xs-12">
                <div className="home-product-tab-category text-center">
                  <div className="section-title title-head">
                    <h3>SẢN PHẨM NỔI BẬT</h3>
                    <img src="../../src/Assets/icon-title.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="product-conttab-wrapper">
                <div className="active-owl-product def-owl row">
                  {products?.map((product: any, index: any) => (
                    <div className="col-md-4 col-lg-3 col-sm-6" key={index + 1}>
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
                                Chi tiết
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
                                  ? `${formatPrice(product.maxPrice)}`
                                  : `${formatPrice(
                                      product.minPrice
                                    )} - ${formatPrice(product.maxPrice)} `}
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
                  <img src="../../src/Assets/img__bt.jpg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="product-banner-right">
                <div className="img-banner">
                  <div className="pbanner-image hvreff-defm10 posr">
                    <img src="../../src/Assets/img__bt_3.jpg" alt="" />
                  </div>
                </div>
                <div className="img-banner">
                  <div className="pbanner-image hvreff-defm10 posr">
                    <img src="../../src/Assets/img__bt_4.jpg" alt="" />
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
                    <h3>DANH MỤC NỔI BẬT</h3>
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
                          <p>Đang tải danh mục...</p>
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
