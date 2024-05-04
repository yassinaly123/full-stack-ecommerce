const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });

const isAuthorized = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    if (req.user.id === 2) {
      req.user.role = "admin";
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = isAuthorized;