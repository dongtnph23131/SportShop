import Acount from "../models/acount";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { resetPasswordVilidators } from "../validators/acount";
export const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email
        const user = await Acount.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "Email chưa được đăng ký"
            })
        }
        const code = Math.floor(Math.random() * 999999).toString()
        user.passwordResetToken = code;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false })
        const message = `Mã đổi mật khẩu của bạn là ${code}. Mã đổi mật khẩu có hiệu lực 1 phút`
        const transporter = nodemailer.createTransport({
            tls: {
                rejectUnauthorized: false
            },
            service: 'gmail',
            auth: {
                user: 'tranngocdong2042003@gmail.com',
                pass: process.env.PasswordMail
            }

        });
        const mailOptions = {
            from: 'tranngocdong2042003@gmail.com',
            to: req.body.email,
            subject: 'FORGOT PASSWORD',
            text: message
        }
        try {
            await transporter.sendMail(mailOptions)
            return res.status(200).json({
                status: "success",
                message: "Token sent to email"
            })
        }
        catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
export const resetPassword = async (req, res) => {
    try {
        const { error } = resetPasswordVilidators.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const code=req.body.code;
        const user = await Acount.findOne({
            passwordResetToken: code,
            passwordResetExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                message: "Mã đổi mật khẩu không chính xác"
            })
        }
        const handlePass = await bcrypt.hash(req.body.password, 10)
        user.password = handlePass;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined
        user.passwordChangeAt = Date.now();
        await user.save({ validateBeforeSave: false })
        const token = jwt.sign({ id: user._id },process.env.signature, {
            expiresIn: '1d'
        })
        user.password = undefined
        return res.status(200).json({
            message: "Mật khẩu mới được cập nhâp",
            user,
            token
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}