import mongoose from "mongoose";
import Product from "../models/product.model.js";
import upload from "../config/fileUpload.js";

export const createProduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({ message: err || "Error uploading file" });
      } else {
        const product = req.body;

        if (!product.name || !product.price) {
          return res.status(400).json({
            success: false,
            message: "Please provide all required fields",
          });
        }

        const newProduct = new Product({
          name: product.name,
          price: product.price,
          image: `/uploads/${req?.file?.filename}`,
        });

        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const uploadSingleImg = () => (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, data: fileUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
