import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // allows to use JSON data in the req.body

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server stared at http://localhost:5000");
});
