const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/productsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(" DB connection error:", err));

app.use("/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

//productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/product");
router.post("/", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

//product.js

const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Price must be greater than 0"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Electronics", "Accessories", "Stationery", "Other"],
    default: "Other",
  },
}, { timestamps: true });
module.exports = mongoose.model("Product", productSchema);

