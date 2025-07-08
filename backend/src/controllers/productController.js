import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

//Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("seller", "name email country city state tehsil phone");
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in productController (getProducts) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email country city state tehsil phone"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log("Error in productController (getProductById) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Create a new product (Seller only)
export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Access denied!" });
    }
    const { title, description, price, category, image } = req.body;
    let imageUrl = null;
    let imagePublicId;

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products", // Cloudinary folder name
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;

      // Delete the locally stored file after upload
      fs.unlinkSync(req.file.path);
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image: imageUrl,
      imagePublicId,
      seller: req.user.id,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("Error in productController (createProduct) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Update product (Seller only)
export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    let imageUrl;
    let imagePublicId;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    if (req.user.id !== product.seller.toString())
      return res.status(403).json({ message: "Not authorized!" });

    if (req.file) {
      // Delete the previous image from Cloudinary
      if (product?.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products", // Cloudinary folder name
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;

      // Delete the locally stored file after upload
      fs.unlinkSync(req.file.path);
    }
    const updatedFields = {
      title,
      description,
      price,
      category,
    };
    if (imageUrl && imagePublicId) {
      updatedFields.image = imageUrl;
      updatedFields.imagePublicId = imagePublicId;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log("Erron in productController (updateProduct) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Delete product (Seller/Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    if (
      req.user.role !== "admin" &&
      req.user.id.toString() !== product.seller.toString()
    ) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    //Extract public ID from Cloudinary URL
    if (product.image) {
      const imageUrlParts = product.image.split("/");
      const publicId = imageUrlParts[imageUrlParts.length - 1].split(".")[0];
      // Delete image from Cloudinary
      // Wait for Cloudinary deletion to complete
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log("Error in productController (deleteProduct) ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//Get seller's products
export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    console.log(
      "Error in Product Controller (getSellerProducts) ",
      error.message
    );
    res.status(500).json({ message: "Internal server error!" });
  }
};
