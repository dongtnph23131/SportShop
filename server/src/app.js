import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import authRouter from "./routers/auth";
import productRouter from "./routers/product"
import collectionsRouter from "./routers/collections"
import imageRouter from "./routers/image"
import optionRouter from "./routers/option"
import variantsRouter from "./routers/variants"
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api',authRouter)
app.use('/api',productRouter)
app.use('/api', collectionsRouter)
app.use('/api', imageRouter)
app.use('/api', optionRouter)
app.use('/api', variantsRouter)

mongoose.connect(process.env.URL_DATABASE);

export const viteNodeApp = app;