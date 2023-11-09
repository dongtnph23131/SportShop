import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetProductQuery } from "../api/product";
import { useEffect, useState } from "react";
import { useAddItemCartMutation } from "../api/cart";

const Detail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [addItemToCart] = useAddItemCartMutation();
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const handleAddToCart = async () => {
    if (!selectedAttributes) {
      alert("Hãy chọn thuộc tính sản phẩm");
      return;
    } else if (product) {
      const productVariantId = product.productVariantIds;
      const selectedVariant = productVariantId.find((item: any) =>
        Object.keys(selectedAttributes).every((option) =>
          item.options.includes(selectedAttributes[option])
        )
      );
      if (selectedVariant) {
        const cart = {
          token: Cookies.get("token"),
          productVariantIds: selectedVariant._id,
        };
        try {
          await addItemToCart(cart);
          alert("Sản phẩm đã được thêm vào giỏ hàng.");
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Thuộc tính ko tồn tại !");
      }
    }
  };
  const handleAttributeChange = (attributeName: any, value: any) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [attributeName]: value,
    });
  };
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
            {product?.images?.map((item: any, index: any) => {
              return (
                <div key={index + 1} className="small-img-col">
                  <img
                    src={`${item.url}`}
                    width="100%"
                    className="small-img"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="single-pro-details">
          <h6>Home / T-Shirts</h6>
          <h4>{product ? `${product.name}` : ``}</h4>

          <h2>
            {" "}
            Price: {product ? `${product.minPrice}-${product.maxPrice}` : ``} $
          </h2>
          {product?.options.map((productItem: any, index: any) => {
            return (
              <div key={index + 1} className="box-qlt">
                <span>{productItem.name}:</span>
                <ul>
                  {productItem?.values.map((item: any, indexItem: any) => {
                    const isSelected =
                      selectedAttributes[productItem.name] === item;
                    return (
                      <li
                        className={isSelected ? "selected" : ""}
                        key={indexItem + 1}
                      >
                        <a
                          onClick={() =>
                            handleAttributeChange(productItem.name, item)
                          }
                        >
                          {item}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <button className="normal" onClick={handleAddToCart}>
            Add to Cart{" "}
          </button>
          <h4>Descriptions</h4>
          <span>{product ? product.description : ""}</span>
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
