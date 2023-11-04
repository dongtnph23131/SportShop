
import Cart from "../models/cart"
import CartItem from "../models/cartItem";
import ProductVariant from "../models/productVariant";
export const addCart = async (req, res) => {
    try {
        const { productVariantIds } = req.body
        const user = req.user;
        const cart = await Cart.findOne({ customerId: user.id }).populate("items", "-__v")
        console.log(cart);
        const productVariant = await ProductVariant.findById(productVariantIds)
        if (!cart || cart.items.length===0) {
            const cartItem = await CartItem.create({ productVariantIds, productIds: productVariant.productId, customerId: user._id })
            const cartOfUser = await Cart.create({ customerId: user._id })
            await Cart.findByIdAndUpdate(cartOfUser._id, {
                $addToSet: {
                    items: cartItem._id,
                },
            });
            return res.status(200).json({
                message: 'Sản phẩm đã thêm vào giỏ hàng'
            })
        }
        else {
            const itemExistCart = await cart.items.find((item) => item.productVariantIds == productVariantIds)
            const cartItem = await CartItem.findOne({ customerId: user._id, productVariantIds: itemExistCart.productVariantIds })
            await CartItem.findByIdAndUpdate(cartItem._id, {
                quantity: cartItem.quantity + 1
            }, { new: true })
        }
        return res.status(200).json({
            message: 'Sản phẩm đã thêm vào giỏ hàng'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const getCartOfUser = async (req, res) => {
    try {
        const user = req.user;
        const cart = await CartItem.find({ customerId: user._id }).populate('productVariantIds').populate('productIds')
        return res.status(200).json(cart)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const removeItem = async (req, res) => {
    try {
        const { productVariantIds } = req.body
        const user = req.user;
        const cart = await Cart.findOne({ customerId: user.id }).populate("items", "-__v")
        const itemExistCart = await cart.items.find((item) => item.productVariantIds == productVariantIds)
        const cartItem = await CartItem.findOne({ customerId: user._id, productVariantIds: itemExistCart.productVariantIds })
        if (cartItem.quantity > 1) {
            await CartItem.findByIdAndUpdate(cartItem._id, {
                quantity: cartItem.quantity - 1
            }, { new: true })
            return res.status(200).json({
                message: 'Thành công'
            })
        }
        else {
            await CartItem.findByIdAndDelete(cartItem._id)
            await Cart.findOneAndUpdate({customerId: user.id},{
                $pull: {
                    items: cartItem._id
                }
            })
            return res.status(200).json({
                message: 'Thành công'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};