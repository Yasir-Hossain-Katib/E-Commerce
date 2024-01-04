const Order = require('../models/order'); // Adjust the path based on your actual folder structure

// Fetch orders for the authenticated user using userId
const fetchOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Implement your logic to fetch orders for the given userId
    const userOrders = await Order.find({ userId });

    res.json({ userId, orders: userOrders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user.userId;

    // Create a new order
    const newOrder = new Order({
      userId,
      product,
      quantity,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { fetchOrders, createOrder };
