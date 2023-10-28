export const authorization = async (req, res, next) => {
    try {
        const user = req.user
        if (!(user.role == "admin")) {
            return res.status(203).json({
                message: "Bạn không có quyền thực hiện hành công này !"
            })
        }
        next()
    }
    catch (error) {
        res.status(203).json({
            message: error.message
        })
    }
}