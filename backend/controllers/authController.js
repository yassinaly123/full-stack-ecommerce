const User = require("../models/User");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    const isMatch = (password == user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    let userInfo = {};
    if (user.id == 2) {
      userInfo = {
        username: user.username,
        email: user.email,
        isAdmin: true,
      };
    } else {
      userInfo = {
        username: user.username,
        email: user.email,
      };
    }
    res.status(200).json({
      message: "Login successful",
      user: { ...userInfo },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signup = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { login, signup, logout };
