const Rating = require("../models/Rating");
const User = require("../models/User");

const createRating = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { username } = await User.findByPk(user_id);
    const { rating, review, product_id } = req.body;
    const existingRating = await Rating.findOne({
      where: { user_id, product_id },
    });
    if (existingRating) {
      return res.status(400).json({ error: "Rating already exists" });
    }
    const newRating = await Rating.create({
      rating,
      review,
      user_id,
      product_id,
      username,
    });
    res.status(201).json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getRatingsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const ratings = await Rating.findAll({ where: { product_id: productId } });
    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error getting ratings by product ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRatingById = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const rating = await Rating.findByPk(ratingId);
    res.status(200).json(rating);
  } catch (error) {
    console.error("Error getting rating by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const updatedRating = await Rating.update(req.body, {
      where: { id: ratingId },
    });
    res.status(200).json(updatedRating);
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteRating = async (req, res) => {
  try {
    const ratingId = req.params.id;
    await Rating.destroy({ where: { id: ratingId } });
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRating,
  getRatingsByProductId,
  getRatingById,
  updateRating,
  deleteRating,
};
