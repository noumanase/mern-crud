import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); // root directory location

app.use(express.urlencoded({ extended: true })); // allows to use form data in the req.body
app.use(express.json()); // allows to use JSON data in the req.body

app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // we can fetch stored images from this directory as http://localhost/uploads/image.jpg

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("server running at PORT: ", PORT);
});
