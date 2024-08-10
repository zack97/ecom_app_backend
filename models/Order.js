const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: String, required: true },
      },
    ],
    totalAmount: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending, Completed, Cancelled, etc.
    address: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Paid, Failed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
