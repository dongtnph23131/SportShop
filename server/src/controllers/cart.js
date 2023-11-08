import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import ProductVariant from "../models/productVariant";
export const addCart = async (req, res) => {
  try {
    const { productVariantIds } = req.body;
    const user = req.user;
    const cart = await Cart.findOne({ customerId: user._id }).populate(
      "items",
      "-__v"
    );
    const productVariant = await ProductVariant.findById(productVariantIds);
    if (!cart) {
      const cartItem = await CartItem.create({
        productVariantIds,
        productIds: productVariant.productId,
        customerId: user._id,
      });
      const cartOfUser = await Cart.create({ customerId: user._id });
      await Cart.findByIdAndUpdate(cartOfUser._id, {
        $addToSet: {
          items: cartItem._id,
        },
      });
      return res.status(200).json({
        message: "Sản phẩm đã thêm vào giỏ hàng",
      });
    }
    if (cart.items.length === 0) {
      const cartItem = await CartItem.create({
        productVariantIds,
        productIds: productVariant.productId,
        customerId: user._id,
      });
      await Cart.findByIdAndUpdate(cart._id, {
        $addToSet: {
          items: cartItem._id,
        },
      });
      return res.status(200).json({
        message: "Sản phẩm đã thêm vào giỏ hàng",
      });
    }
    const itemExistCart = await cart.items.find(
      (item) => item.productVariantIds == productVariantIds
    );
    if (itemExistCart) {
      const cartItem = await CartItem.findOne({
        customerId: user._id,
        productVariantIds: itemExistCart.productVariantIds,
      });
      await CartItem.findByIdAndUpdate(
        cartItem._id,
        {
          quantity: cartItem.quantity + 1,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Sản phẩm đã thêm vào giỏ hàng",
      });
    } else {
      const cartItem = await CartItem.create({
        productVariantIds,
        productIds: productVariant.productId,
        customerId: user._id,
      });
      await Cart.findByIdAndUpdate(cart._id, {
        $addToSet: {
          items: cartItem._id,
        },
      });
      return res.status(200).json({
        message: "Sản phẩm đã thêm vào giỏ hàng",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const getCartOfUser = async (req, res) => {
  try {
    const user = req.user;
    const cart = await CartItem.find({ customerId: user._id })
      .populate("productVariantIds")
      .populate("productIds");
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const removeItem = async (req, res) => {
  try {
    const { productVariantIds } = req.body;
    const user = req.user;
    const cart = await Cart.findOne({ customerId: user._id }).populate(
      "items",
      "-__v"
    );
    const itemExistCart = await cart.items.find(
      (item) => item.productVariantIds == productVariantIds
    );
    const cartItem = await CartItem.findOne({
      customerId: user._id,
      productVariantIds: itemExistCart.productVariantIds,
    });
    if (cartItem.quantity > 1) {
      await CartItem.findByIdAndUpdate(
        cartItem._id,
        {
          quantity: cartItem.quantity - 1,
        },
        { new: true }
      );
      return res.status(200).json({
        message: "Thành công",
      });
    } else {
      await CartItem.findByIdAndDelete(cartItem._id);
      await Cart.findOneAndUpdate(
        { customerId: user.id },
        {
          $pull: {
            items: cartItem._id,
          },
        }
      );
      return res.status(200).json({
        message: "Thành công",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const updateItem = async (req, res) => {
  try {
    const { productVariantIds, quantity } = req.body;
    if (quantity < 0) {
      return res.status(400).json({
        message: "Số lượng sản phẩm > 0",
      });
    }
    const user = req.user;
    const cart = await Cart.findOne({ customerId: user._id }).populate(
      "items",
      "-__v"
    );
    const itemExistCart = await cart.items.find(
      (item) => item.productVariantIds == productVariantIds
    );
    if (!itemExistCart) {
      return res.status(400).json({
        message: "Không có sản phẩm này trong giỏ hàng",
      });
    }
    const cartItem = await CartItem.findOne({
      customerId: user._id,
      productVariantIds: itemExistCart.productVariantIds,
    });
    if (quantity === 0) {
      await CartItem.findByIdAndDelete(cartItem._id);
      await Cart.findOneAndUpdate(
        { customerId: user.id },
        {
          $pull: {
            items: cartItem._id,
          },
        }
      );
      return res.status(200).json({
        message: "Thành công",
      });
    } else {
      await CartItem.findByIdAndUpdate(
        cartItem._id,
        {
          quantity,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: "Thành công",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const removeItemCart = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    const user = req.user;
    const cart = await Cart.findOne({ customerId: user._id }).populate(
      "items",
      "-__v"
    );
    await CartItem.findByIdAndDelete(cartItemId);
    await Cart.findOneAndUpdate(
      { customerId: user._id },
      {
        $pull: {
          items: cartItemId,
        },
      }
    );
    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
