const Category = require("../models/Category");

const getALLCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };


const createCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
        });
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            category.name = req.body.name || category.name;
            category.description = req.body.description || category.description;
            category.imageUrl = req.body.imageUrl || category.imageUrl;
            const updatedCategory = await category.save();
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getALLCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};