import Option from "../models/Products/option";

export const getAll = async (req, res) => {
    try {
        const data = await Option.paginate({}, Option);

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
        const option = await Option.create(body);
        if (option.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            option,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};