const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const isAuthorized = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");

router
  .route("/")
  .get(isAuthorized, isAdmin, getAllOrders)
  .post(isAuthorized, createOrder);
router
  .route("/:id")
  .get(isAuthorized, getOrderById)
  .put(isAuthorized, updateOrder)
  .delete(isAuthorized, isAdmin, deleteOrder);

module.exports = router;
