const Order = require("../models/Order");

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send({ success: true, order });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.send({ success: true, orders });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
    });
    res.send({ success: true, order });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};
