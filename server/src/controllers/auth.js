import Acount from "../models/acount"
import bcrypt from "bcryptjs";
import { signupValidators } from "../validators/auth";
export const signup = async (req, res) => {
    try {
        const { firstName,lastName, email, password } = req.body;
        const { error } = signupValidators.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                messsage: "Email đã tồn tại",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Acount.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        user.password = undefined;

        return res.status(201).json({
            message: "Đăng ký thành công",
            user,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}