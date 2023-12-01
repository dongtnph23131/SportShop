import express from "express"
import { getBanners } from "../controllers/banner"

const router = express.Router()

router.get("/getBanners", getBanners)

export default router