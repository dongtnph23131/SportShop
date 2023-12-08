import { Router } from "express";
import bcrypt from "bcryptjs";
import { cloudinary } from "../../libs/cloudinary";
import User from "../../models/user";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone } = req.body;
    const userExist = await User.find({ email });

    if (userExist.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Delete user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/active", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: true });

    return res.status(200).json({
      message: "Active user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const body = req.body;

    await User.findByIdAndUpdate(req.params.id, body);

    return res.status(200).json({
      message: "Edited user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/deactive", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false });

    return res.status(200).json({
      message: "Deactive user successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
    let { firstName, lastName, image } = req.body;

    if (image) {
      const { secure_url } = await cloudinary.uploader.upload(image, {
        public_id: req.user.id,
        folder: "avatars",
        overwrite: true,
        invalidate: true,
      });

      image = secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, avatar: image },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const userRoutes = router;
