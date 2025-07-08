import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
// Seller only
router.post(
  "/",
  protect,
  checkRole(["seller"]),
  upload.single("image"),
  createProduct
);
// Seller only
router.put(
  "/:id",
  protect,
  checkRole(["seller"]),
  upload.single("image"),
  updateProduct
);
// Seller or Admin only
router.delete("/:id", protect, checkRole(["seller", "admin"]), deleteProduct);

router.get(
  "/seller/products",
  protect,
  checkRole(["seller"]),
  getSellerProducts
);

export default router;
