const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" MongoDB Connected"))
.catch(err => console.error(" MongoDB error:", err));

app.use("/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));


//produt.js

const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String },
  stock: { type: Number, required: true, min: 0 }
});
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  variants: [variantSchema]
}, { timestamps: true });
module.exports = mongoose.model("Product", productSchema);


//productController.js
const Product = require("../models/product");
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

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByColor = async (req, res) => {
  try {
    const color = req.params.color;
    const products = await Product.find({ "variants.color": color });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//productroutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
router.post("/seed", productController.insertSampleProducts);
router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getByCategory);
router.get("/by-color/:color", productController.getByColor);

module.exports = router;
