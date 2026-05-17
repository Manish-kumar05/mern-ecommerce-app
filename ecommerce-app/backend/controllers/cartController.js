const Cart = require("../models/Cart");

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Cart
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
};