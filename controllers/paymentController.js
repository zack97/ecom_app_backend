const Payment = require("../models/Payment");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment record
exports.createPayment = async (req, res) => {
  try {
    const { userId, orderId, paymentMethod, amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    const payment = new Payment({
      userId,
      orderId,
      paymentMethod,
      amount,
      currency,
      paymentStatus: "Pending",
      transactionId: paymentIntent.id,
    });

    await payment.save();
    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    const payment = await Payment.findOne({ transactionId: paymentIntent.id });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    payment.paymentStatus = "Completed";
    await payment.save();

    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
