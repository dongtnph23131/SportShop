export const translateOrderStatus = (status: string) => {
  switch (status) {
    case "Pending":
      return "Chờ xử lý";
    case "Completed":
      return "Đã hoàn thành";
    case "Canceled":
      return "Đã hủy";
    default:
      return "Chờ xử lý";
  }
};

export const translateOrderPaymentStatus = (status: string) => {
  switch (status) {
    case "Not paid":
      return "Chờ thanh toán";
    case "Paid":
      return "Đã thanh toán";
    case "Refunded":
      return "Đã hoàn tiền";
    default:
      return "Đã hủy";
  }
};

export const translateOrderDeliveryStatus = (status: string) => {
  switch (status) {
    case "Not shipped":
      return "Chưa giao hàng";
    case "Shipping":
      return "Đang giao hàng";
    case "Shipped":
      return "Đã giao hàng";
    default:
      return "Đã hủy";
  }
};
