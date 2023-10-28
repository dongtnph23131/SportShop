import React, { useState } from "react";
import Slider from 'antd/lib/slider';
import { useGetAllProductsQuery } from "../api/product";
const Shops = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [ishandleSortVisible, setIsSortVisible] = useState(false);
  const [sort, setSort] = useState<String>()
  const [order, setOrder] = useState<String>()
  const { data: products, isLoading } = useGetAllProductsQuery({ sort, order})
  const handleFilterClick = () => {
    setIsFilterVisible(true);
  };

  const handleSortClick = () => {
    setIsSortVisible(!ishandleSortVisible);
  };
  const handleHideFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsFilterVisible(false);
  };

  const [range, setRange] = useState([0, 50]);

  const handleRangeChange = (value: number) => {
    setRange([value, range[1]]);
  };

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
                  <div className="title-filter-shops">
                    <h3> Filters</h3>
                    <span>
                      <a href="" onClick={handleHideFilter}>
                        X
                      </a>
                    </span>
                  </div>
                  <div className="danger-shops">
                    <span>Price range ($)</span>

                    <div style={{ width: "300px" }}>
                      <Slider
                        range
                        step={1}
                        value={range}
                        onChange={handleRangeChange}
                      />
                    </div>
                    <p>
                      Khoảng giá trị: {range[0]} - {range[1]}
                    </p>
                  </div>

                  <div className="subcate">
                    <select className="select-sub">
                      <option value="">Moana Bryan (9)</option>
                      <option value="">Moana Bryan (9)</option>
                      <option value="">Moana Bryan (9)</option>
                    </select>

                  </div>

                  <div className="box-item-stores">
                    <span>Storess</span>
                    <div className="box-checkbox-filter">
                      <div className="boxs-mos">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Moana Bryan (9)</label>
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
                    <li onClick={()=>{
                      setSort('price')
                      setOrder('asc')
                      setIsSortVisible(false)
                    }}>
                      <p>Giá tăng dần</p>
                    </li>
                    <li onClick={()=>{
                      setSort('price')
                      setOrder('desc')
                      setIsSortVisible(false)
                    }}>
                      <p>Giá giảm dần</p>
                    </li>
                    <li onClick={()=>{
                      setSort('name')
                      setOrder('asc')
                      setIsSortVisible(false)
                    }}>
                      <p>A-Z</p>
                    </li>
                    <li onClick={()=>{
                      setSort('name')
                      setOrder('desc')
                      setIsSortVisible(false)
                    }}>
                      <p>Z-A</p>
                    </li>
                    <li onClick={()=>{
                      setSort('createdAt')
                      setOrder('desc')
                      setIsSortVisible(false)
                    }}>
                      <p>Mới nhất</p>
                    </li>
                    <li onClick={()=>{
                      setSort('createdAt')
                      setOrder('asc')
                      setIsSortVisible(false)
                    }}>
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
            return <div className="pro" key={index + 1}>
              <img src={`${product.photoDescription}`} alt="" />
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
                <h4>${product.price}</h4>
              </div>
              <a href="#">
                <i className="fab fa-opencart cart"></i>
              </a>
            </div>
          })}
        </div>
      </section>
    </div>
  );
};

export default Shops;
