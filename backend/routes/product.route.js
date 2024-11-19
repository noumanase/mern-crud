import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  uploadSingleImg,
} from "../controllers/product.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";
import upload from "../config/fileUpload.js";

const router = express.Router();

router.post("/", verifyJwt, createProduct);

router.get("/", verifyJwt, getProducts);

router.put("/:id", verifyJwt, updateProduct);

router.delete("/:id", verifyJwt, deleteProduct);

// router.post("/upload", verifyJwt, upload.single("image"), uploadSingleImg);

router.post("/upload", (req, res) => {
  try {
    upload(req, res, function (err) {
      if (err) {
        res.status(400).json({ message: err || "Error uploading file" });
      } else {
        // Success message after a successful upload
        res.status(200).json({
          message: "File uploaded successfully",
          fileUrl: `/uploads/${req?.file?.originalname}`,
        });
      }
    });
  } catch (error) {
    console.log("upload error: ", error);
  }
});

export default router;
