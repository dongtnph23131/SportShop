import  { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { getCategories } from "../api/category";
import { useNavigate } from "react-router-dom";
import { Pagination, Rate } from "antd";
import "../../../client/src/Assets/css/bao.css";
const Shops = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [ishandleSortVisible, setIsSortVisible] = useState(false);
  const [sort, setSort] = useState<String>();
  const [order, setOrder] = useState<String>();
  const [categories, setCategories] = useState<any>([]);
  const [page, setPage] = useState<any>(1);
  const [dataCategories, setDataCategories] = useState<any>([]);
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetAllProductsQuery({
    sort,
    order,
    dataCategories,
    page,
    limit: 8,
  });
  const { data: productsNoPage } = useGetAllProductsQuery({
    sort,
    order,
    dataCategories,
  });
  const handleFilterClick = () => {
    setIsFilterVisible(true);
  };

  const handleSortClick = () => {
    setIsSortVisible(!ishandleSortVisible);
  };
  const handleHideFilter = (e: any) => {
    e.preventDefault();
    setIsFilterVisible(false);
  };
  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);
  const formatPrice = (price:any) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return formattedPrice;
  };
  return (
    <div>
      <section id="page-header">
      </section>

      <div className="breadcrumbs-wrapper breadcumbs-bg1">
        <div className="container-brk ctnr" style={{ padding: "0px 80px" }}>
          <div className="row">
            <div className="col-xs-12">
              <div className="breadcrumbs breadcrumbs-style1 sep1 posr">
                <ul>
                  <li>
                    <div className="breadcrumbs-icon1">
                      <a href="index.html" title="Return to home">
                        <i className="fa fa-home"></i>
                      </a>
                    </div>
                  </li>
                  <li>Shops Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="product1" className="section-p1 ctnr">
        <div className="fiter">
          <div className="filter-shops">
            <span className="sct-filter" onClick={handleFilterClick}>
              Lọc
            </span>
            {isFilterVisible && (
              <div className="box-container-filter">
                <div className="box-item-fillter">
                  <div className="item__filter__top">
                    <div className="title-filter-shops">
                      <h3> Lọc sản phẩm</h3>
                      <span>
                        <a href="" onClick={handleHideFilter}>
                          X
                        </a>
                      </span>
                    </div>
                    <div className="subcate">
                      <div className="select-sub">
                        {categories.map((item: any) => {
                          return (
                            <div
                              className="clickToFilter"
                              onClick={() => {
                                setPage(1);
                                setDataCategories([
                                  ...dataCategories,
                                  { _id: item._id, name: item.name },
                                ]);
                                setCategories(
                                  categories.filter(
                                    (category: any) => category._id !== item._id
                                  )
                                );
                              }}
                              key={item._id}
                            >
                              {item.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="box-item-stores">
                      <span>Storess</span>
                      <div className="box-checkbox-filter">
                        {dataCategories.map((item: any) => {
                          return (
                            <div key={item._id} className="boxs-mos">
                              <button>
                                <i
                                  onClick={() => {
                                    setPage(1);
                                    setCategories([
                                      ...categories,
                                      { _id: item._id, name: item.name },
                                    ]);
                                    setDataCategories(
                                      dataCategories.filter(
                                        (category: any) =>
                                          category._id !== item._id
                                      )
                                    );
                                  }}
                                  className="fas fa-trash-alt"
                                ></i>
                              </button>
                              <label htmlFor="">{item.name}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="btn-filter" onClick={()=>setIsFilterVisible(false)}>
                    <a>Thoát</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="sort-shops">
            <span onClick={handleSortClick}>Sắp xếp</span>
            {ishandleSortVisible && (
              <div className="box-sort-shops">
                <div className="item-sort-shops">
                  <ul className="items-sort-ul">
                    <li
                      onClick={() => {
                        setSort("maxPrice");
                        setOrder("asc");
                        setIsSortVisible(false);
                        setPage(1);
                      }}
                    >
                      <p>Giá tăng dần</p>
                    </li>
                    <li
                      onClick={() => {
                        setSort("maxPrice");
                        setOrder("desc");
                        setIsSortVisible(false);
                        setPage(1);
                      }}
                    >
                      <p>Giá giảm dần</p>
                    </li>
                    <li
                      onClick={() => {
                        setSort("name");
                        setOrder("asc");
                        setIsSortVisible(false);
                        setPage(1);
                      }}
                    >
                      <p>A-Z</p>
                    </li>
                    <li
                      onClick={() => {
                        setSort("name");
                        setOrder("desc");
                        setIsSortVisible(false);
                        setPage(1);
                      }}
                    >
                      <p>Z-A</p>
                    </li>
                    <li
                      onClick={() => {
                        setSort("createdAt");
                        setOrder("desc");
                        setIsSortVisible(false);
                        setPage(1);
                      }}
                    >
                      <p>Mới nhất</p>
                    </li>
                    <li
                      onClick={() => {
                        setSort("createdAt");
                        setOrder("asc");
                        setIsSortVisible(false);
                        setPage(1);
                      }}
                    >
                      <p>Cũ nhất</p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoading ? (
          <p>Đang tải ...</p>
        ) : (
          <>
            {products?.length > 0 ? (
              <>
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
                        <div className="qiezzz">
                          <img src={`${product?.images[0].url}`} alt="" />
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

                        <div className="des">
                          <span>{product?.categoryId?.name}</span>
                          <h5>{product.name}</h5>
                          <h4>
                            {product.minPrice === product.maxPrice
                              ? `${formatPrice(product.maxPrice)}`
                              : `${formatPrice(product.minPrice)} - ${formatPrice(product.maxPrice)}`}
                          </h4>
                        </div>
                        <Rate value={product?.raitings} disabled />
                        <a>
                          <i className="fab fa-opencart cart"></i>
                        </a>
                      </div>
                    );
                  })}
                </div>
                <Pagination
                  defaultCurrent={page}
                  onChange={(value) => setPage(value)}
                  total={productsNoPage?.length}
                  pageSize={8}
                />
              </>
            ) : (
              <>
                <div className="cart__zero">
                  <div className="icon__cart__0">
                    {" "}
                    <img src="../../src/Assets/icon__cart__0.png" alt="" />
                  </div>
                  <h3>Không có sản phẩm nào phù hợp</h3>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Shops;
