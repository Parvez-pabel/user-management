import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/utils/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
// app.use("/api/v1")

export default app;
