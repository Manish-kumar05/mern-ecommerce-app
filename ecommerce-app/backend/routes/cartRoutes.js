const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  removeCartItem,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.delete("/:id", protect, removeCartItem);

module.exports = router;