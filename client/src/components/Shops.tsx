import React, { useState } from "react";
import Slider from 'antd/lib/slider'; 
const Shops = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [ishandleSortVisible, setIsSortVisible] = useState(false);

  const handleFilterClick = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleSortClick = () => {
    setIsSortVisible(!ishandleSortVisible);
  };
  const handleHideFilter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default behavior of an anchor tag
    setIsFilterVisible(false);
  };

  const [range, setRange] = useState([0, 50]); // Giá trị mặc định cho khoảng slider

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
                        min={0}
                        max={100}
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
                    <span>Subcategories</span>
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

                      <div className="boxs-mos">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Moana Bryan (9)</label>
                      </div>

                      <div className="boxs-mos">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Moana Bryan (9)</label>
                      </div>

                      <div className="boxs-mos">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Moana Bryan (9)</label>
                      </div>

                      <div className="boxs-mos">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Moana Bryan (9)</label>
                      </div>

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
                    <li>
                      <a href="">best stores</a>
                    </li>
                    <li>
                      <a href="">best stores</a>
                    </li>
                    <li>
                      <a href="">best stores</a>
                    </li>
                    <li>
                      <a href="">best stores</a>
                    </li>
                    <li>
                      <a href="">best stores</a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pro-container">
          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
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
              <i className="fab fa-opencart cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
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
              <i className="fab fa-opencart cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
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
              <i className="fab fa-opencart cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
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
              <i className="fab fa-opencart cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
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
              <i className="fab fa-opencart cart"></i>
            </a>
          </div>

          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
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
              <i className="fab fa-opencart cart"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shops;
