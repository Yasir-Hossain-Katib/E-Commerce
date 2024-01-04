const express=require("express")
const router=express.Router();

const orderController = require("../controllers/orderController");

const authenticateUser= require("../middleware/authMiddleware");


router.get('/orders', authenticateUser, orderController.fetchOrders);

// Example route to create a new order (requires authentication)
router.post('/orders', authenticateUser, orderController.createOrder);

module.exports = router;