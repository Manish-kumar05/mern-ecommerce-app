const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place Order
const placeOrder = async (req, res) => {
  try {
    // Get cart items
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Create order items
    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // Calculate total
    const totalPrice = cartItems.reduce(
      (acc, item) =>
        acc + item.product.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    // Clear cart
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("orderItems.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
};