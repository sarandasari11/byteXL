const mongoose = require("mongoose");

// Nested schema for variants
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String },
  stock: { type: Number, required: true, min: 0 }
});

// Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true },
  variants: [variantSchema]
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
