const { log } = require("console");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const Sequelize = require("sequelize");
const { where, Op } = Sequelize;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const getProducts = async (req, res) => {
  try {
    if (req.query.pageNumber === "all") {
      const products = await Product.findAll();
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      return res.status(200).json(products);
    }
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const rows = await Product.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (page - 1),
    });
    const products = rows.rows;
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res
      .status(200)
      .json({ products, page, pages: Math.ceil(rows.count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    log("req.body", req.body);
    uploadFile.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: "Multer Error" });
      }
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      log("111",req.body);

      const { name, description, price, countInStock, disscount, categoryId } =
        req.body;

      if (!name || !price || !countInStock) {
        log("222",req.body);
        return res.status(400).json({
          message:
            "Please provide all required fields: name, price, and countInStock",
        });
      }
      const imageUrl = req.file ? req.file.filename : null;
      const product = await Product.create({
        name,
        description,
        price,
        image_url: imageUrl,
        count_in_stock: countInStock,
        category_id: categoryId,
        discount: disscount,
      });

      res.status(201).json(product);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  log("ew", req.body);
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const {
        name,
        description,
        price,
        countInStock,
        disscount,
        categoryId,
        imageUrl,
        sold,
      } = req.body.updatedValues;
      console.log({
        name,
        description,
        price,
        countInStock,
        disscount,
        categoryId,
        imageUrl,
        sold,
      });
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.count_in_stock = countInStock ?? product.count_in_stock;
      product.image_url = imageUrl ?? product.image_url;
      product.category_id = categoryId ?? product.category_id;
      product.discount = disscount ?? product.discount;
      product.sold = sold ?? product.sold;
      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrendingProductsInLastWeek = async (req, res) => {
  try {
    const products = await Product.find({
      createdAt: {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
      isTrending: true,
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBestSellingProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ sold: -1 }).limit(5);
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  log(req.params);
  try {
    const products = await Product.findAll({
      where: {
        category_id: req.params.categoryId,
      },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsHavingDiscount = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { discount: { [Sequelize.Op.gt]: 0 } },
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrendingProductsInLastWeek,
  getBestSellingProducts,
  getProductsByCategory,
  getProductsHavingDiscount,
};
