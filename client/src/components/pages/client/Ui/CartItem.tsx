import Cookies from "js-cookie";
import {
  useAddItemCartMutation,
  useRemoveItemCartMutation,
  useRemoveItemMutation,
  useUpdateItemCartMutation,
} from "../../../../api/cart";
import { InputNumber } from "antd";
const CartItem = ({ item }: any) => {
  const token = Cookies.get("token");
  const [addCart] = useAddItemCartMutation();
  const [updateItemCart] = useUpdateItemCartMutation();
  const [removeItemCart] = useRemoveItemCartMutation();
  const [removeItem] = useRemoveItemMutation();
  const onChangeQuantity = async (quantity: any) => {
    if (quantity === "") {
      return;
    }
    await updateItemCart({
      productVariantIds: item.productVariantIds._id,
      quantity,
      token,
    });
  };
  return (
    <tr>
      <td>
        <button
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
        <img src={`${item?.productIds?.images[0].url}`} alt="" />
      </td>
      <td>
        {item?.productIds?.name} -- {item?.productVariantIds?.name}
      </td>
      <td>${item?.productVariantIds?.price}</td>
      <button
        className="normal"
        onClick={() =>
          removeItemCart({
            productVariantIds: item?.productVariantIds?._id,
            token,
          })
        }
      >
        -
      </button>
      <td>
        <InputNumber value={item.quantity} onChange={onChangeQuantity} />
      </td>
      <button
        className="normal"
        onClick={() =>
          addCart({ productVariantIds: item?.productVariantIds?._id, token })
        }
      >
        +
      </button>
      <td>${item?.productVariantIds?.price * Number(item?.quantity)}</td>
    </tr>
  );
};

export default CartItem;
