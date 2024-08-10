const Product = require("../models/Products");

// Get all products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search products by key
exports.searchProduct = async (req, res) => {
  try {
    const key = req.params.key;
    const products = await Product.find({
      $or: [
        { title: { $regex: key, $options: "i" } },
        { description: { $regex: key, $options: "i" } },
        { supplier: { $regex: key, $options: "i" } },
      ],
    });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { title, supplier, price, imageUrl, description, product_location } =
      req.body;

    const newProduct = new Product({
      title,
      supplier,
      price,
      imageUrl,
      description,
      product_location,
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
