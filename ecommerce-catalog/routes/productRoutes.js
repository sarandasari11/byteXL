const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Routes
router.post("/seed", productController.insertSampleProducts);
router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getByCategory);
router.get("/by-color/:color", productController.getByColor);

module.exports = router;
