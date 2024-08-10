const router = require("express").Router();
const paymentController = require("../controllers/paymentController");

router.post("/", paymentController.createPayment);
router.post("/confirm", paymentController.confirmPayment);

module.exports = router;
