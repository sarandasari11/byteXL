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
