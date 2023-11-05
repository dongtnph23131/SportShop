import { Router } from "express";
import Category from "../../models/category";
import { categoryCreateEditSchema } from "../../validators/category";
import slugify from "@sindresorhus/slugify";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate("productIds");

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(200).json({
        message: "Không có danh mục",
      });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = categoryCreateEditSchema.parse(req.body);

    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    return res.status(200).json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

router.put("/:slug", async (req, res) => {
  try {
    const { name } = categoryCreateEditSchema.parse(req.body);
    const data = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name,
        slug: slugify(name),
      },
      {
        new: true,
      }
    );

    return res.json({
      message: "Cập nhật danh mục thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

router.delete("/:slug", async (req, res) => {
  try {
    const data = await Category.findOneAndDelete({ slug: req.params.slug });

    return res.json({
      message: "Xóa danh mục thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
});

export const categoryRoutes = router;
