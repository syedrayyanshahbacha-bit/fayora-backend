const express = require('express');
const router = express.Router();
const {
  DELIVERY_AREAS,
  DELIVERY_BASE,
  CURRENCY
} = require('../config/constants');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendemail');

// 📌 POST /orders → Create new order & send confirmation
router.post('/', async (req, res) => {
  const { name, address, postalCode, contact, email } = req.body;

  // Basic validation
  if (!name || !address || !postalCode || !contact || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Calculate delivery fee (custom area or base rate)
  const deliveryFee = DELIVERY_AREAS[postalCode] || DELIVERY_BASE;

  try {
    // Save order to DB
    const order = await Order.create({
      name,
      address,
      postalCode,
      contact,
      deliveryFee
    });

    // ✉️ Build branded confirmation email
    const emailHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px;">
        <h2 style="color:#b4975a;">Thank you for your order, ${name}!</h2>
        <p>We’re thrilled to prepare your FAYORA package.</p>
        <p><strong>Delivery Fee:</strong> ${deliveryFee} ${CURRENCY}</p>
        <p><strong>Estimated Delivery:</strong> 2–4 business days</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
        <p style="font-size:0.9em;color:#666;">This is an automated message from FAYORA Luxury Perfumes.</p>
      </div>
    `;

    // Attempt email without blocking order creation
    try {
      await sendEmail(email, 'Your FAYORA Order Confirmation', emailHtml);
    } catch (emailErr) {
      console.error('Email sending error:', emailErr.message);
    }

    // Success response
    res.status(201).json({
      message: 'Order received successfully',
      order
    });

  } catch (err) {
    console.error('Order creation error:', err.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// 📌 GET /orders → Fetch all orders (sorted newest first)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error('Fetch orders error:', err.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;