import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetAllProductsQuery, useGetProductQuery } from "../api/product";
import { useEffect, useState } from "react";
import { useAddItemCartMutation } from "../api/cart";
import { Pagination, message, Form, Rate, Button, Input} from "antd";

const Detail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [addItemToCart] = useAddItemCartMutation();
  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<number>(0);
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
      limit: 4,
    });
  const { data: productsNoPage } = useGetAllProductsQuery({
    sort,
    order,
    dataCategories,
  });
  const selectedVariant = product?.productVariantIds.find((item: any) =>
    item.options.every((option: any) =>
      Object.values(selectedAttributes).includes(option)
    )
  );
  const handleAddToCart = async () => {
    if (!selectedAttributes) {
      alert("Hãy chọn thuộc tính sản phẩm");
      return;
    } else if (product) {
      if (selectedVariant) {
        const cart = {
          token: Cookies.get("token"),
          productVariantIds: selectedVariant._id,
        };
        try {
          await addItemToCart(cart);
          message.success("Sản phẩm đã được thêm vào giỏ hàng");
        } catch (error) {
          console.error(error);
        }
      } else {
        message.error("Vui lòng chọn thuộc tính sản phẩm!");
      }
    }
  };
  const handleAttributeChange = (attributeName: any, value: any) => {
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
  const { TextArea } = Input;
  return (
    <div>
      <section id="prodetails" className="section-p1">
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
          <Rate allowHalf defaultValue={2.5} />;
          <h2 className="price-detail">
            {" "}
            {selectedVariant
              ? selectedVariant?.price
              : product
              ? product.minPrice === product.maxPrice
                ? product.minPrice
                : `${product.minPrice}-${product.maxPrice}`
              : ""}
            $
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
      <section className="comment">
        <div className="container">
          <Form
            name="wrap"
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
          >
            <div className="form-title">
              <h3 className="text-xl">
                Nhận xét - Đánh giá !
              </h3>
            </div>
            <div className="rating__old">
              <div className="rating__old__item">
                <div className="avt">
                  <img src="../../src/Assets/user.png" alt="" />
                </div>
                <div className="old__comment">
                  <div className="old__comment__item">
                    <div className="ratings">
                      <span className="star">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="star">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="star">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="star">
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="star">
                        <i className="fas fa-star"></i>
                      </span>
                    </div>
                    <div className="date__comment">21-11-2023</div>
                  </div>
                  <div className="last__comment">Sản phẩm tốt</div>
                </div>
              </div>
            </div>
            <div className="box_rating">
              <Form.Item name="rating" label="Đánh giá" initialValue={1}>
                <Rate />
              </Form.Item>
            </div>
            <Form.Item
              name="review"
              label="Nhận xét của bạn"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống bình luận",
                },
              ]}
            >
              <TextArea
                showCount
                maxLength={100}
                style={{ height: 120, resize: "none" }}
                placeholder="Hãy bình luận sản phẩm này"
              />
            </Form.Item>

            <Form.Item label=" ">
              <div className="wrap__button">
                <Button
                  type="primary"
                  className="bg-blue-500"
                  htmlType="submit"
                >
                  Đánh giá
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
      <section id="product1" className="section-p1">
        <h2>OUR PRODUCTS</h2>
        <p>Summer Collection New Modern Design</p>
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
          pageSize={4}
        />
      </section>
    </div>
  );
};

export default Detail;
