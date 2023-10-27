import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import authRouter from "./routers/auth";
import productRouter from "./routers/product"
import categoryRouter from "./routers/category"
import sizeRouter from "./routers/size"
import colorRouter from "./routers/color"
import acounRouter from "./routers/acount"
import uploadRouter from "./routers/upload"
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api',authRouter)
app.use('/api',productRouter)
app.use('/api', categoryRouter)
app.use('/api',sizeRouter)
app.use('/api',colorRouter)
app.use('/api',acounRouter)
app.use('/api', uploadRouter)

mongoose.connect(process.env.URL_DATABASE);

export const viteNodeApp = app;