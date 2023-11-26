import { Router } from "express";
import { cloudinary } from "../../libs/cloudinary";
import User from "../../models/user";

const router = Router();

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
