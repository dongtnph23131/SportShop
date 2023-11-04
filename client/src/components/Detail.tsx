
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/product";

const Detail = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useGetProductQuery(id)
  return (
    <div>
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img
            src={`${product ? `${product.images[0].url}` : ``}`}
            width="100%"
            id="MainImg"
            alt=""
          />

          <div className="small-img-group">
            {product?.images?.map((item: any,index:any) => {
              return <div key={index+1} className="small-img-col">
                <img
                  src={`${item.url}`}
                  width="100%"
                  className="small-img"
                  alt=""
                />
              </div>
            })}
          </div>
        </div>

        <div className="single-pro-details">
          <h6>Home / T-Shirts</h6>
          <h4>{product ? `${product.name}` : ``}</h4>

          <h2> Price: {product ? `${product.minPrice}-${product.maxPrice}` : ``} $</h2>
          {/* <p>Số lượng : {quantity}</p> */}
          {product?.options.map((productItem: any,index:any) => {
            return <div key={index+1} className="box-qlt">
              <span>{productItem.name}:</span>
              <ul>
                {productItem?.values.map((item: any, index: any) => {
                  return <li key={index + 1}><a>{item}</a></li>
                })}
              </ul>
            </div>
          })}
          Số lượng:  <input type="number" value="1" />
          <button className="normal">Add to Cart </button>
          <h4>Descriptions</h4>
          <span>
            {product ? product.description : ''}
          </span>
        </div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
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

          <div className="pro">
            <img src="../../src/Assets/product2.jpg" alt="" />
            <div className="des">
              <span>adidas</span>
              <h5>Cartoon Ladies paint</h5>
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
              <h5>Cartoon Astronaut Dress</h5>
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

export default Detail;