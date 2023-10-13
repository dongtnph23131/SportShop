import Image from "../models/Products/image";

export const getAll = async (req, res) => {
    try {
        const data = await Image.find();

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
export const create = async (req, res) => {
    try {
        const body = req.body;
        const image = await Image.create(body);
        if (image.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            image,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};