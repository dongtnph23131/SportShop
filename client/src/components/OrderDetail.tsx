import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../src/Assets/orderDetail.css";
import { useCancelOrderMutation, useGetOneOrderQuery } from "../api/order";
import Cookies from "js-cookie";
import { Button, Form, Modal, Rate, message } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useCreateCommentMutation } from "../api/comment";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import {
  tran,
  translateOrderDeliveryStatus,
  translateOrderPaymentStatus,
  translateOrderStatus,
  translateOrderStatusslateOrderStatus,
} from "../utils";
const sensitiveWords = ["clm", "Buồi", "dmm"];
const OrderDetail = () => {
  const { id }: any = useParams();
  const token = Cookies.get("token");
  const { data, isLoading } = useGetOneOrderQuery(id);
  const [cancelOrder] = useCancelOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenReview, setIsModalOpenReview] = useState(false);
  const [productId, setProductId] = useState();
  const [raiting, setRaiting] = useState<any>(0);
  const [content, setContent] = useState<any>();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModalReview = () => {
    setIsModalOpenReview(true);
  };

  const handleOkReview = () => {
    form.resetFields();
    setContent("");
    setRaiting(0);
    setIsModalOpenReview(false);
  };

  const handleCancelReview = () => {
    form.resetFields();
    setContent("");
    setRaiting(0);
    setIsModalOpenReview(false);
  };
  const [infoStaff, setInforStaff] = useState<any>("");
  const formatPrice = (price: any) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return formattedPrice;
  };
  const [createComment] = useCreateCommentMutation();
  const [form] = useForm();
  const containsSensitiveWord = sensitiveWords.some((word) =>
    content?.toLowerCase().includes(word.toLowerCase())
  );
  const navigate = useNavigate();
  const validateContent = (rule: any, value: any, callback: any) => {
    const containsSensitiveWord = sensitiveWords.some((word) =>
      value?.toLowerCase().includes(word?.toLowerCase())
    );

    if (containsSensitiveWord) {
      callback && callback("Bình luận không được chứa từ ngữ nhạy cảm");
    } else {
      callback && callback();
    }
  };
  const onFinish = async () => {
    if (containsSensitiveWord) return;
    const comment: any = await createComment({
      token,
      comment: { raiting, content, productId, orderId: id },
    });
    if (!comment?.error) {
      Swal.fire("Good job!", comment.data.message, "success");
      form.resetFields();
      setContent("");
      setRaiting(0);
      navigate(`/products/${productId}`);
    } else {
      Swal.fire({
        icon: "error",
        title: comment?.error.data.message,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>
      ) : (
        <div className="container" style={{ marginTop: "20px" }}>
          <div className="account-page__content">
            <div id="detail-order">
              <div className="thank-box">
                <div className="detail-order-wrapper">
                  <div className="detail-order">
                    <h1
                      className="detail-order-heading"
                      style={{ margin: "0px" }}
                    >
                      Thông tin đơn hàng {data?.order?.code}
                    </h1>
                    <div className="detail-order-status">
                      {translateOrderStatus(data?.order?.status)}
                    </div>
                  </div>

                  {data?.order?.deliveryStatus === "Shipping" ||
                  data?.order?.status === "Completed" ||
                  data?.order?.status === "Canceled" ? (
                    ""
                  ) : (
                    <button
                      className="order-cancel-button"
                      onClick={async () => {
                        if (confirm("Bạn có muốn hủy đơn hàng không ?")) {
                          const data: any = await cancelOrder({ token, id });
                          if (data?.error) {
                            message.error("Bạn không thể hủy đơn hàng");
                          } else {
                            message.success("Hủy đơn hàng thành công");
                          }
                        }
                      }}
                    >
                      Hủy đơn
                    </button>
                  )}
                </div>

                <div className="detail-order-info">
                  <ul className="detail-order-info__list">
                    <li>
                      <div className="detail-order-info__title">
                        Ngày đặt hàng:
                      </div>
                      <div className="detail-order-info__content">
                        {new Date(data?.order?.createdAt).toLocaleString()}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Tên người nhận
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.fullName}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Địa chỉ Email:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.email}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Số điện thoại:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.phone}
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Phương thức thanh toán:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.typePayment === "Direct" &&
                          "Trực tiếp khi nhận hàng"}
                        {data?.order?.typePayment === "Online" && "Online"}
                      </div>
                    </li>
                    {data?.order?.discountCode ? (
                      <li>
                        <div className="detail-order-info__title">
                          Mã giảm giá
                        </div>
                        <div className="detail-order-info__content">
                          {data?.order?.discountCode}
                        </div>
                      </li>
                    ) : (
                      <></>
                    )}
                    <li>
                      <div className="detail-order-info__title">
                        Trạng thái thanh toán:
                      </div>
                      <div className="detail-order-info__content">
                        <div className="detail-order-status">
                          {translateOrderPaymentStatus(
                            data?.order?.paymentStatus
                          )}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Trạng thái giao hàng:
                      </div>
                      <div className="detail-order-info__content">
                        <div className="detail-order-status">
                          {translateOrderDeliveryStatus(
                            data?.order?.deliveryStatus
                          )}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Nhân viên quản lí đơn:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.managerId?.firstName}{" "}
                        {data?.order?.managerId?.lastName}{" "}
                        <Button
                          type="primary"
                          onClick={() => {
                            showModal();
                            setInforStaff(data?.order?.managerId);
                          }}
                        >
                          View
                        </Button>
                        <Modal
                          title="Thông tin nhân viên quản lí đơn"
                          open={isModalOpen}
                          onOk={() => {
                            handleOk();
                            setInforStaff("");
                          }}
                          onCancel={() => {
                            handleCancel();
                            setInforStaff("");
                          }}
                        >
                          <p>Số điện thoại: {infoStaff?.phone}</p>
                          <p>Email: {infoStaff?.email}</p>
                        </Modal>
                      </div>
                    </li>
                    <li>
                      <div className="detail-order-info__title">
                        Địa chỉ giao hàng:
                      </div>
                      <div className="detail-order-info__content">
                        {data?.order?.address}
                      </div>
                    </li>
                    {data?.oder?.node ? (
                      <li>
                        <div className="detail-order-info__title">Ghi chú:</div>
                        <div className="detail-order-info__content"></div>
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>

                <div className="grid detail-order-button">
                  <div className="grid__column">
                    <div className="order-date"></div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Biến thể</th>
                      <th>Số lượng</th>
                      <th>Giá niêm yết</th>
                      <th className="text-righted">Thành tiền</th>
                      {data?.order?.status === "Completed" ? (
                        <>
                          <th>Đánh giá sản phẩm</th>
                        </>
                      ) : (
                        <></>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.order?.items?.map((item: any) => {
                      return (
                        <tr>
                          <td className="text--left">
                            <div>
                              <div>
                                <img
                                  src={item?.image}
                                  width={140}
                                  height={140}
                                />
                              </div>
                              <div style={{ marginLeft: "8px" }}>
                                <h4>
                                  {item?.productName ?? item.productId.name}
                                </h4>
                              </div>
                            </div>
                          </td>
                          <td>{item?.productVariantName}</td>
                          <td>{item.quantity}</td>
                          <td>{formatPrice(item?.productVariantPrice)}</td>
                          <td>
                            {formatPrice(
                              item?.quantity * item?.productVariantPrice
                            )}
                          </td>
                          {data?.order?.status === "Completed" ? (
                            <td>
                              {item?.isReview === true ? (
                                <>
                                  Đã đánh giá{" "}
                                  <NavLink
                                    to={`/products/${item.productId._id}`}
                                  >
                                    <Button>View</Button>
                                  </NavLink>
                                </>
                              ) : (
                                <Button
                                  type="primary"
                                  onClick={() => {
                                    showModalReview();
                                    setProductId(item.productId._id);
                                  }}
                                >
                                  Đánh giá
                                </Button>
                              )}
                              <Modal
                                title="Đánh giá sản phẩm"
                                open={isModalOpenReview}
                                onOk={() => {
                                  handleOkReview();
                                }}
                                onCancel={() => {
                                  handleCancelReview();
                                }}
                              >
                                <Form form={form}>
                                  <div className="box_rating">
                                    <Form.Item name="rating" initialValue={0}>
                                      <Rate
                                        value={raiting}
                                        onChange={(value) => setRaiting(value)}
                                      />
                                    </Form.Item>
                                  </div>
                                  <Form.Item
                                    name="review"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Không được bỏ trống bình luận",
                                      },
                                      {
                                        validator: validateContent,
                                      },
                                    ]}
                                  >
                                    <TextArea
                                      onChange={(e) =>
                                        setContent(e.target.value)
                                      }
                                      value={content}
                                      showCount
                                      maxLength={100}
                                      style={{ height: 120, resize: "none" }}
                                      placeholder="Hãy bình luận sản phẩm này"
                                    />
                                  </Form.Item>
                                  <div className="wrap__button">
                                    <Button
                                      disabled={
                                        !content || containsSensitiveWord
                                      }
                                      onClick={() => onFinish()}
                                      type="primary"
                                      className="bg-blue-500"
                                    >
                                      Đánh giá
                                    </Button>
                                  </div>
                                </Form>
                              </Modal>
                            </td>
                          ) : (
                            <></>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={data?.order?.status === "Completed" ? 5 : 4}>
                        Tổng giá trị sản phẩm
                      </td>{" "}
                      <td>{formatPrice(data?.order?.totalPrice)}</td>
                    </tr>
                    <tr>
                      <td colSpan={data?.order?.status === "Completed" ? 5 : 4}>
                        Giảm giá
                      </td>{" "}
                      <td>{formatPrice(data?.order?.couponPrice)}</td>
                    </tr>
                    <tr>
                      <td colSpan={data?.order?.status === "Completed" ? 5 : 4}>
                        Phí giao hàng
                      </td>{" "}
                      <td>{formatPrice(data?.order?.shippingPrice)}</td>
                    </tr>
                    <tr className="total_payment">
                      <td colSpan={data?.order?.status === "Completed" ? 5 : 4}>
                        Tổng thanh toán
                      </td>{" "}
                      <td>
                        {formatPrice(
                          data?.order?.orderTotalPrice > 0
                            ? data?.order?.orderTotalPrice
                            : 0
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
