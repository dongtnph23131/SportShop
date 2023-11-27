import { Router } from "express";
import { cloudinary } from "../../libs/cloudinary";
import Banner from "../../models/banner";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const banner = await Banner.find();

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { name, status, image } = req.body;

    if (image) {
      const { secure_url } = await cloudinary.uploader.upload(image, {
        public_id: req.params.id,
        folder: "avatars",
        overwrite: true,
        invalidate: true,
      });

      image = secure_url;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { name, status, image },
      { new: true }
    );

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, status, image } = req.body;

    const banner = await Banner.create({
      name,
      status,
    });

    const { secure_url } = await cloudinary.uploader.upload(image, {
      public_id: banner.id,
      folder: "avatars",
      overwrite: true,
      invalidate: true,
    });

    await Banner.findByIdAndUpdate(banner.id, {
      image: secure_url,
    });

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const bannerRoutes = router;
