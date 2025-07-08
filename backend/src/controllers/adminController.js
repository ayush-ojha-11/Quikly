import User from "../models/User.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

//Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in admin controller ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

//get all sellers
export const getSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password");
    res.status(200).json(sellers);
  } catch (error) {
    console.log("Error in admin controller ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "seller",
      "name email country city state tehsil phone"
    );
    res.status(200).json(products);
  } catch {
    console.log("Error in admin controller", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
// Delete user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Error in admin controller ", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
//get stats
export const getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalBuyers = await User.countDocuments({ role: "buyer" });
    res.status(200).json({
      totalProducts,
      totalSellers,
      totalBuyers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats." });
  }
};

//delete products of seller

export const deleteProductsOfSeller = async (req, res) => {
  try {
    const sellerId = req.params.id;
    //fetch all products of a seller
    const products = await Product.find({ seller: sellerId });
    // delete images from cloudinary
    for (const product of products) {
      if (product.image) {
        const imageUrlParts = product.image.split("/");
        const public_id = imageUrlParts[imageUrlParts.length - 1].split(".")[0];
        await cloudinary.uploader.destroy(`products/${public_id}`);
      }
    }

    //delete products from DB
    await Product.deleteMany({ seller: sellerId });
    return res
      .status(200)
      .json({ message: "All products of the seller deleted successfully." });
  } catch (error) {
    console.log("Error in deleteProductsOfSeller:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
