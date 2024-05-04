const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbConnection");
const User = require("./User");
const Product = require("./Product");

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Rating.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
Rating.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE" });

module.exports = Rating;