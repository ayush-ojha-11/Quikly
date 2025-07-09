import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

//Middleware
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "https://quikly-phi.vercel.app/",
    credentials: true,
  })
);

//Databse connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err.message));

app.get("/ping", (req, res) => res.send("OK"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/location", locationRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
