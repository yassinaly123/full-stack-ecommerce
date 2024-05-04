const express = require("express");
const router = express.Router();
const isAuthorized = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrendingProductsInLastWeek,
  getBestSellingProducts,
  getProductsByCategory,
  getProductsHavingDiscount,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(isAuthorized, isAdmin, createProduct);
router.route("/trending").get(getTrendingProductsInLastWeek);
router.route("/best-selling").get(getBestSellingProducts);
router.route("/discount").get(getProductsHavingDiscount);
router
  .route("/:id")
  .get(getProductById)
  .put(isAuthorized, isAdmin, updateProduct)
  .delete(isAuthorized, isAdmin, deleteProduct);
router.route("/category/:categoryId").get(getProductsByCategory);

module.exports = router;
