import Cookies from "js-cookie";
import {
  useAddItemCartMutation,
  useRemoveItemCartMutation,
  useRemoveItemMutation,
  useUpdateItemCartMutation,
} from "../../../../api/cart";
import Swal from "sweetalert2";
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
        await updateItemCart({
          productVariantIds: item?.productVariantIds?._id,
          quantity,
          token,
        });
      }
    }
  };
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
        <img src={`${item?.productIds?.images[0].url}`} alt="" />
      </td>
      <td>
        {item?.productIds?.name} -- {item?.productVariantIds?.name}
      </td>
      <td>{item?.productVariantIds?.price}.000 VNĐ</td>

      <td>
        <div className="box__crement">
          <button
            className="decrement__cart"
            onClick={() =>
              removeItemCart({
                productVariantIds: item?.productVariantIds?._id,
                token,
              })
            }
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
            onClick={() => {
              if (item.quantity === item?.productVariantIds?.inventory) {
                Swal.fire({
                  icon: "error",
                  title: `Bạn chỉ đc mua tối đa ${item?.productVariantIds?.inventory} sản phẩm`,
                });
                return;
              } else {
                addCart({
                  productVariantIds: item?.productVariantIds?._id,
                  token,
                  quantity: 1,
                });
              }
            }}
          >
            +
          </button>
        </div>
      </td>

      <td>
        <div className="priceAll">
          {item?.productVariantIds?.price * Number(item?.quantity)}.000 VNĐ
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
