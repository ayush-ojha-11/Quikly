import express from "express";
import {
  getUsers,
  getAllProducts,
  deleteUser,
  getStats,
  getSellers,
  deleteProductsOfSeller,
} from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, checkRole(["admin"]), getUsers);
router.get("/products", protect, checkRole(["admin"]), getAllProducts);
router.get("/sellers", protect, checkRole(["admin"]), getSellers);
router.delete("/users/:id", protect, checkRole(["admin"]), deleteUser);
router.delete(
  "/seller/:id",
  protect,
  checkRole(["admin"]),
  deleteProductsOfSeller
);
router.get("/stats", protect, checkRole(["admin"]), getStats);

export default router;
