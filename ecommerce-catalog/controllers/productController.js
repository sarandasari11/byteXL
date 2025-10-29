const Product = require("../models/product");

// ✅ Insert sample products (helper for testing)
exports.insertSampleProducts = async (req, res) => {
  try {
    await Product.deleteMany(); // clear old
    const products = await Product.insertMany([
      {
        name: "Winter Jacket",
        price: 90,
        category: "Apparel",
        variants: [
          { color: "Black", size: "M", stock: 8 },
          { color: "Gray", size: "L", stock: 12 }
        ]
      },
      {
        name: "Smartphone",
        price: 690,
        category: "Electronics",
        variants: []
      },
      {
        name: "Running Shoes",
        price: 120,
        category: "Footwear",
        variants: [
          { color: "Red", size: "M", stock: 10 },
          { color: "Blue", size: "L", stock: 5 }
        ]
      }
    ]);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get products by category
exports.getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get products by variant color
exports.getByColor = async (req, res) => {
  try {
    const color = req.params.color;
    const products = await Product.find({ "variants.color": color });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
