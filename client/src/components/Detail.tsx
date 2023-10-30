
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/product";

const Detail = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useGetProductQuery(id)
  const [colors, setColors] = useState<any>()
  const [sizes, setSizes] = useState<any>()
  const [images, setImages] = useState<any>()
  const [image, setImage] = useState<any>()
  const [colorId, setColorId] = useState()
  const [sizeId, setSizeId] = useState<any>()
  const [quantity, setQuantity] = useState<any>()
  useEffect(() => {
    if (product) {
      setQuantity(product.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue.quantity
      }, 0))
      const arrayColors = product.map((item: any) => {
        return item.colorId
      })

      const idSetColrs = new Set();
      const uniqueColors = arrayColors.filter((product: any) => {
        if (idSetColrs.has(product._id)) {
          return false;
        }
        idSetColrs.add(product._id);
        return true;
      });
      setColors(uniqueColors)
      const arraySizes = product.map((item: any) => {
        return item.sizeId
      })

      const idSetSizes = new Set();
      const uniqueSizes = arraySizes.filter((product: any) => {
        if (idSetSizes.has(product._id)) {
          return false;
        }
        idSetSizes.add(product._id);
        return true;
      });
      setSizes(uniqueSizes)


      const idSetImages = new Set();
      const uniqueImages = product.filter((product: any) => {
        if (idSetImages.has(product.colorId._id)) {
          return false;
        }
        idSetImages.add(product.colorId._id);
        return true;
      });
      setImages(uniqueImages);
      setImage(uniqueImages[0].img)
    }
  }, [product])
  return (
    <div>
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img
            src={`${product ? `${image}` : ``}`}
            width="100%"
            id="MainImg"
            alt=""
          />

          <div className="small-img-group">
            {images?.map((item: any) => {
              return <div key={item._id} className="small-img-col">
                <img
                  src={`${item.img}`}
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
          <h4>{product ? `${product[0].productId.name}` : ``}</h4>

          <h2> Price: {product ? `${product[0].productId.price}` : ``} $</h2>
          <p>Số lượng : {quantity}</p>
          <div className="box-qlt">
            <span>Color:</span>
            <ul>
              {colors?.map((item: any) => {
                return <li style={{ backgroundColor: `${item._id == colorId ? '#4FB68D' : ''}` }} onClick={() => {
                  setSizeId('')
                  setColorId(item._id)
                  const data = product.filter((itemProduct: any) => {
                    return itemProduct.colorId._id === item._id
                  })
                  setQuantity(product.filter((itemProduct: any) => {
                    return itemProduct.colorId._id === item._id
                  }).reduce((accumulator: any, currentValue: any) => {
                    return accumulator + currentValue.quantity
                  }, 0))
                  setImage(data[0].img)
                  setSizes(data.map((item: any) => item.sizeId))
                }} key={item._id}><a>{item.name}</a></li>
              })}
            </ul>
            Số lượng:  <input type="number" value="1" />
          </div>
          <div className="color-detaile">
            <span>Size:</span>
            <ul>
              {sizes?.map((item: any) => {
                return <li style={{ backgroundColor: `${item._id == sizeId ? '#4FB68D' : ''}` }} onClick={() => {

                  if (!colorId) {
                    alert('Chọn màu sắc')
                  }
                  else {
                    setSizeId(item._id)
                    setQuantity(product.filter((itemProduct: any) => {
                      return itemProduct.colorId._id === colorId && itemProduct.sizeId._id === item._id
                    }).reduce((accumulator: any, currentValue: any) => {
                      return accumulator + currentValue.quantity
                    }, 0))
                  }
                }} key={item._id}><a>{item.name}</a></li>
              })}
            </ul>
          </div>
          <button className="normal" onClick={() => {
            if (!colorId || !sizeId) {
              alert('Chọn biến thể sản phẩm')

            }
            else {
              const data = product.find((item: any) => {
                return item.colorId._id === colorId && item.sizeId._id === sizeId
              })
            }
          }}>Add to Cart </button>
          <h4>Descriptions</h4>
          <span>
           {product?product[0]?.productId?.description:''}
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