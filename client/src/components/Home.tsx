import React, { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { Link, useNavigate } from "react-router-dom";
import { getCategoryById, getCategories } from "../api/category";

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

  return (
    <div>
      <div className="new-arrival-product-area hp1-napa pt-60">
        <div className="container">
          <div className="row">
            <div className="product-tab-category-wrapper">
              <div className="col-xs-12">
                <div className="home-product-tab-category text-center">
                  <div className="section-title title-head">
                    <h3>FEATURED PRODUCTS</h3>
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
                    <h3>Featured categories</h3>
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
                      {isLoadingCategories ? (
                        <p>Loading categories...</p>
                      ) : (
                        categories.map((category) => (
                          <div className="col-md-3" key={category._id}>
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

                                  {category.description && (
                                    <p>{category.description}</p>
                                  )}
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
