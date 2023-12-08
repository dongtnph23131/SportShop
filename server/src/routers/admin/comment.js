import { Router } from "express";
import Comment from "../../models/comment";

const router = Router();

router.put("/:id/hide", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        isHidden: true,
      },
      { new: true }
    );

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/show", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        isHidden: false,
      },
      { new: true }
    );

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const commentRoutes = router;
