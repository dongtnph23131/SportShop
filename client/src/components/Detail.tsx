import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetProductQuery } from "../api/product";
import { useEffect, useState } from "react";
import { useAddItemCartMutation, useGetCartOfUserQuery } from "../api/cart";
import { Pagination, message, Rate, InputNumber } from "antd";
import { useGetAllCommentByProductQuery } from "../api/comment";
import Swal from "sweetalert2";
import { getCategoryDetail } from "../api/category";

const Detail = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const { data: product, isLoading } = useGetProductQuery(id);
  const [addItemToCart] = useAddItemCartMutation();
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [page, setPage] = useState<any>(1);
  const { data } = useGetAllCommentByProductQuery(id);
  const navigate = useNavigate();
  const [products, setProducts] = useState<any>([]);
  const [productsNoPage, setProductsNoPage] = useState<any>([]);
  const [quantityProduct, setQuantityProduct] = useState<any>();
  const [isCheckQuantity, setIsCheckQuantity] = useState<any>(false);
  useEffect(() => {
    if (product) {
      getCategoryDetail(product.categoryId).then((data) => {
        setProducts(
          data?.data?.productIds
            .filter((item: any) => {
              return item._id !== id;
            })
            .slice((page - 1) * 4, page * 4)
        );
      });
      getCategoryDetail(product.categoryId).then((data) => {
        setProductsNoPage(
          data?.data?.productIds.filter((item: any) => {
            return item._id !== id;
          })
        );
      });
      if (Object.keys(selectedAttributes).length === 0) {
        setQuantityProduct(
          product?.productVariantIds.reduce(
            (total: any, variant: any) => total + variant.inventory,
            0
          )
        );
      } else {
        const selectedVariant = product?.productVariantIds.find((item: any) =>
          item.options.every((option: any) =>
            Object.values(selectedAttributes).includes(option)
          )
        );
        if (selectedVariant) {
          setQuantityProduct(selectedVariant.inventory);
        }
      }
    }
  }, [product, page, selectedAttributes]);
  const { data: carts } = useGetCartOfUserQuery(token);

  const selectedVariant = product?.productVariantIds.find((item: any) =>
    item.options.every((option: any) =>
      Object.values(selectedAttributes).includes(option)
    )
  );

  const [quantity, setQuantity] = useState<any>(1);
  const handleAddToCart = async () => {
    if (product) {
      if (selectedVariant) {
        const cart = {
          token: Cookies.get("token"),
          productVariantIds: selectedVariant._id,
          quantity,
        };
        try {
          const itemCart = carts?.find((item: any) => {
            return item.productVariantIds._id === selectedVariant._id;
          });
          if (
            itemCart &&
            itemCart.quantity + quantity > selectedVariant.inventory
          ) {
            Swal.fire({
              icon: "error",
              title: `Quá số lượng tồn kho`,
            });
            return;
          }
          if (selectedVariant.inventory <= 0) {
            Swal.fire({
              icon: "error",
              title: `Sản phẩm hết hàng`,
            });
            return;
          }
          await addItemToCart(cart);
          if (token) {
            message.success("Sản phẩm đã được thêm vào giỏ hàng");
          }
        } catch (error) {}
      } else {
        console.log(selectedVariant);

        message.error("Vui lòng chọn thuộc tính sản phẩm!");
      }
    }
  };

  const handleAttributeChange = (attributeName: any, value: any) => {
    setQuantity(1);
    setIsCheckQuantity(false);
    setSelectedAttributes({
      ...selectedAttributes,
      [attributeName]: value,
    });
  };
  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const formatPrice = (price: any) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return formattedPrice;
  };
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải</div>
      ) : (
        <div>
          <section id="prodetails" className="section-p1 ctnr">
            <div className="single-pro-image">
              <img
                src={`${product ? `${product.images[selectedImage].url}` : ``}`}
                width="100%"
                id="MainImg"
                alt=""
              />

              <div className="small-img-group">
                {product?.images?.map((item: any, index: any) => {
                  return (
                    <div
                      key={index + 1}
                      className="small-img-col"
                      onClick={() => handleImageClick(index)}
                    >
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
              <h4>{product ? `${product.name}` : ``}</h4>
              <Rate
                value={
                  data?.comments.reduce(
                    (accumulator: any, currentValue: any) =>
                      accumulator + currentValue.raiting,
                    0
                  ) / data?.comments.length
                }
                disabled
              />
              <h2 className="price-detail">
                {" "}
                {selectedVariant
                  ? formatPrice(selectedVariant?.price)
                  : product
                  ? formatPrice(product.minPrice === product.maxPrice)
                    ? formatPrice(product.minPrice)
                    : `${formatPrice(product.minPrice)}-${formatPrice(
                        product.maxPrice
                      )}`
                  : ""}
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
              <p style={{ marginTop: "30px" }}>
                Số lượng còn: {quantityProduct}
              </p>
              {isCheckQuantity ? (
                <p className="error">
                  Chỉ được mua tối đa {selectedVariant?.inventory} sản phẩm
                </p>
              ) : (
                ""
              )}
              <div className="acticon__addtocart">
                <div className="box__cremedetail">
                  <button
                    className="decrement__cart"
                    onClick={() => {
                      if (quantity === 1) {
                        return;
                      } else {
                        setIsCheckQuantity(false);
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <InputNumber
                    className="input__cart"
                    value={quantity}
                    min={1}
                    onChange={(value) => {
                      if (value <= quantityProduct) {
                        setIsCheckQuantity(false);
                        setQuantity(value);
                      } else {
                        setQuantity(selectedVariant?.inventory);
                        setIsCheckQuantity(true);
                        return;
                      }
                    }}
                  />
                  <button
                    className="increment__cart"
                    onClick={() => {
                      if (quantity >= quantityProduct) {
                        setIsCheckQuantity(true);
                        return;
                      } else {
                        setQuantity(quantity + 1);
                        setIsCheckQuantity(false);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
                <button className="normal" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng{" "}
                </button>
              </div>
              <h4>Mô tả</h4>
              <span>{product ? product.description : ""}</span>
            </div>
          </section>
          <section className="comment">
            <div className="container">
              <div className="form-title">
                <h3 className="text-xl">Nhận xét - Đánh giá !</h3>
              </div>
              {data?.comments?.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    marginTop: "20px",
                  }}
                >
                 Sản phẩm chưa có đánh giá nào
                </div>
              )}
              {data?.comments?.map((item: any) => {
                return (
                  item.isHidden === false && (
                    <div key={item._id} className="rating__old">
                      <div className="rating__old__item">
                        <div className="avt">
                          <img src={`${item.customerId.avatar}`} alt="" />
                        </div>
                        <div className="old__comment">
                          <div className="old__comment__item">
                            <div className="ratings">
                              <Rate disabled value={item.raiting} />
                            </div>
                            <div style={{marginTop:'10px'}} className="date__comment">
                              {new Date(item?.createdAt)?.toLocaleString()}
                            </div>
                          </div>
                          <div className="last__comment">{item.content}</div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </section>
          <section id="product1" className="section-p1 ctnr">
            <h2>SẢN PHẨM LIÊN QUAN</h2>
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
                      <span>{product?.categoryId?.name}</span>
                      <h5>{product.name}</h5>
                      <h4>
                        {formatPrice(product.minPrice)} -{" "}
                        {formatPrice(product.maxPrice)}
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
              total={productsNoPage?.length}
              onChange={(value) => setPage(value)}
              pageSize={4}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default Detail;
