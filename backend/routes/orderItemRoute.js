const express = require("express");
const router = express.Router();

const {
  getOrderItemsByOrderId,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItemController");

const isAuthorized = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");

router.route("/order/:orderId").get(getOrderItemsByOrderId);
router
  .route("/:id")
  .get(getOrderItemById)
  .put(updateOrderItem)
  .delete(deleteOrderItem);
router.route("/").post(createOrderItem);

module.exports = router;