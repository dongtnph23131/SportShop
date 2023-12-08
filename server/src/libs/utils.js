export const generateRandomString = (length = 6) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function formatPrice(price) {
  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  })
    .format(Number(price))
    .replace("₫", "VND");
}
