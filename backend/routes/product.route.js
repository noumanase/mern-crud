import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.post("/", verifyJwt, createProduct);

router.get("/", verifyJwt, getProducts);

router.put("/:id", verifyJwt, updateProduct);

router.delete("/:id", verifyJwt, deleteProduct);

export default router;
