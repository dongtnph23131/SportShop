import Product from "../models/product";
import Category from "../models/category";
import Size from "../models/size";
import Color from "../models/color";
import { productValidators } from "../validators/product";

export const getAll = async (req, res) => {
    const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order == "desc" ? -1 : 1,
        },
    };
    try {
        const data = await Product.paginate({}, options);
        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findOne({ _id: id }).populate("categoryId", "-__v");
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const create = async (req, res) => {
    try {
        const body = req.body;
        const { error } = productValidators.validate(body);
        if (error) {
            return res.json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(body);
        const { sizes, colors, categoryId } = req.body;
        //Sử dụng Promise.all để đợi cả hai tác vụ hoàn thành trước khi tiếp tục
        await Promise.all([
            Category.findOneAndUpdate(categoryId, {
                $addToSet: { products: product._id},
            }),
            // Lập qua danh sách sizes và thêm sản phẩm vào mỗi size
            ...sizes.map(sizeId => Size.findOneAndUpdate(sizeId, {
                $addToSet: { products: product._id}
            })),
            // Lập qua danh sách colors và thêm sản phẩm vào mỗi color
            ...colors.map(colorId => Color.findOneAndUpdate(colorId, {
                $addToSet: { products: product._id}
            })),
        ])
        if (product.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const update = async (req, res) => {
    try {
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};