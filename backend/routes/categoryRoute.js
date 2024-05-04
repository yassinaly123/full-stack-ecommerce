const express = require("express");
const router = express.Router();

const {
  getALLCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const isAuthorized = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");

router
  .route("/")
  .get(getALLCategories)
  .post(isAuthorized, isAdmin, createCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(isAuthorized, isAdmin, updateCategory)
  .delete(isAuthorized, isAdmin, deleteCategory);

module.exports = router;
