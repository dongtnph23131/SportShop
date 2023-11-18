import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { getCategories } from "../api/category";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
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
    limit: 12,
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
  return (
    <div>
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <section id="product1" className="section-p1">
        <div className="fiter">
          <div className="filter-shops">
            <span className="sct-filter" onClick={handleFilterClick}>
              Filter
            </span>
            {isFilterVisible && (
              <div className="box-container-filter">
                <div className="box-item-fillter">
                 <div className="item__filter__top">
                 <div className="title-filter-shops">
                    <h3> Filters</h3>
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
                          <div className="clickToFilter"
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

                  <div className="btn-filter">
                    <a href="">Clear Filters</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="sort-shops">
            <span onClick={handleSortClick}>Sort</span>
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
        <Pagination
          defaultCurrent={page}
          onChange={(value) => setPage(value)}
          total={productsNoPage?.length}
          pageSize={12}
        />
      </section>
    </div>
  );
};

export default Shops;
