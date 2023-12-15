import Cookies from "js-cookie";
import {
  useAddItemCartMutation,
  useRemoveItemCartMutation,
  useRemoveItemMutation,
  useUpdateItemCartMutation,
} from "../../../../api/cart";
import Swal from "sweetalert2";
import { InputNumber, message } from "antd";
const CartItem = ({ item }: any) => {
  const token = Cookies.get("token");
  const [addCart] = useAddItemCartMutation();
  const [updateItemCart] = useUpdateItemCartMutation();
  const [removeItemCart] = useRemoveItemCartMutation();
  const [removeItem] = useRemoveItemMutation();
  const onChangeQuantity = async (quantity: any) => {
    if (quantity === "") {
      return;
    } else {
      if (quantity > item?.productVariantIds?.inventory) {
        await updateItemCart({
          productVariantIds: item.productVariantIds._id,
          quantity: item?.productVariantIds?.inventory,
          token,
        });

        Swal.fire({
          icon: "error",
          title: `Bạn chỉ được mua tối đa ${item?.productVariantIds?.inventory} sản phẩm`,
        });
        return;
      } else {
        const data:any = await updateItemCart({
          productVariantIds: item?.productVariantIds?._id,
          quantity,
          token,
        });
        if (data?.error) {
          message.error(data?.error?.data?.message);
        } else {
        }
      }
    }
  };
  function formatPrice(
    price: number | string,
    options: {
      currency?: "USD" | "EUR" | "GBP" | "BDT" | "VND" | "JPY" | "CNY" | "KRW";
      notation?: Intl.NumberFormatOptions["notation"];
    } = {}
  ) {
    const { currency = "VND" } = options;

    return new Intl.NumberFormat("vi", {
      style: "currency",
      currency,
    }).format(Number(price));
  }
  return (
    <tr>
      <td>
        <button
          className="remove__item__product"
          onClick={async () => {
            if (confirm("Bạn có muốn xóa sản phẩm này k ?")) {
              await removeItem({ cartItemId: item._id, token });
            }
          }}
        >
          <i className="far fa-times-circle"></i>
        </button>
      </td>
      <td>
        <img src={`${item?.image}`} alt="" />
      </td>
      <td>
        {item?.productName} -- {item?.productVariantName}
      </td>
      <td>{formatPrice(item?.productVariantPrice)}</td>

      <td>
        <div className="box__crement">
          <button
            className="decrement__cart"
            onClick={async () => {
              const data: any = await removeItemCart({
                productVariantIds: item?.productVariantIds?._id,
                token,
              });
              if (data?.error) {
                message.error(data?.error?.data?.message);
              } else {
              }
            }}
          >
            -
          </button>
          <InputNumber
            className="input__cart"
            value={item.quantity}
            onChange={onChangeQuantity}
          />
          <button
            className="increment__cart"
            onClick={async () => {
              if (item.quantity === item?.productVariantIds?.inventory) {
                Swal.fire({
                  icon: "error",
                  title: `Bạn chỉ đc mua tối đa ${item?.productVariantIds?.inventory} sản phẩm`,
                });
                return;
              } else {
                const data: any = await addCart({
                  productVariantIds: item?.productVariantIds?._id,
                  token,
                  ...item,
                  quantity: 1,
                });
                if (data?.error) {
                  message.error(data?.error?.data?.message);
                } else {
                }
              }
            }}
          >
            +
          </button>
        </div>
      </td>

      <td>
        <div className="priceAll">
          {formatPrice(item?.productVariantPrice * Number(item?.quantity))}
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
