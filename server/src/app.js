import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import authRouter from "./routers/auth";
import productRouter from "./routers/product"
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api',authRouter)
app.use('/api',productRouter)

mongoose.connect(process.env.URL_DATABASE);

export const viteNodeApp = app;