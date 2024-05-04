const express = require("express");
const sequelize = require("./db/dbConnection");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const ratingRoute = require("./routes/ratingRouter");
const authRoute = require("./routes/authRoute");

const app = express();

//db connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("Error connecting to MySQL:", err));





//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//routes
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/ratings", ratingRoute);
app.use("/auth", authRoute);

module.exports = app;