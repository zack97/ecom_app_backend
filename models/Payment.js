const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: { type: String, required: true }, // e.g., 'Stripe', 'PayPal'
    amount: { type: String, required: true },
    currency: { type: String, default: "EURO" },
    paymentStatus: { type: String, default: "Pending" }, // Pending, Completed, Failed
    transactionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
