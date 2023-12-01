import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../../models/user";

const router = Router();

export const JWT_SECRET = "sport-shop-jwt-key";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(404).json("Email doesn't exist!");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(401).json("Wrong password!");

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({
      message: "Login successfully!",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export const authRoutes = router;
