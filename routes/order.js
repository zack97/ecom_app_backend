const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);
router.get("/:userId", orderController.getUserOrders);
router.patch("/:orderId", orderController.updateOrderStatus);

module.exports = router;
