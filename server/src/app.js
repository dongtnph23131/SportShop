import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import acounRouter from "./routers/acount";
import addreesRouter from "./routers/address";
import uploadRouter from "./routers/upload";
import cartRouter from "./routers/cart";
import { adminRoutes } from "./routers/admin";
import orderRouter from "./routers/order";
import profileRouter from "./routers/profile";
import commentRouter from "./routers/comment";
import paymentRouter from "./routers/payment";
import routerBanner from "./routers/banner";
import discountRouter from "./routers/discount";
import giftRouter from "./routers/gift";

dotenv.config();
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

//Admin routes
app.use("/api/admin", adminRoutes);

app.use("/api", authRouter);
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", acounRouter);
app.use("/api", uploadRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", profileRouter);
app.use("/api", addreesRouter);
app.use("/api", commentRouter);
app.use("/api", paymentRouter);
app.use("/api", routerBanner);
app.use("/api", discountRouter);
app.use("/api", giftRouter);

mongoose.connect(process.env.URL_DATABASE);

export const viteNodeApp = app;
