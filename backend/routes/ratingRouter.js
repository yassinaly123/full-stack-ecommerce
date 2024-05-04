const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");

const {
  createRating,
  getRatingsByProductId,
  getRatingById,
  updateRating,
  deleteRating,
} = require("../controllers/ratingController");

router.route("/").post(isAuth,createRating);
router.route("/products/:productId").get(getRatingsByProductId);
router.route("/:id").get(getRatingById).put(updateRating).delete(deleteRating);

module.exports = router;