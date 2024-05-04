// import ur model in starter point of ur app sync models with the database
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Rating = require("./models/Rating");

(async () => {
  try {
    await sequelize.sync({ force: true }); // set force to true to drop existing tables
    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();
