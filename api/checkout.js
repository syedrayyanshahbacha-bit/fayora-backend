// api/checkout.js
import connectDB from '../config/db.js';
import Order from '../models/Order.js'; // Assuming you have an Order model

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { name, email, items, province, discountCode } = req.body;

    const deliveryFees = {
      KPK: 280,
      Sindh: 260,
      Punjab: 270,
      Balochistan: 220,
      Islamabad: 250
    };

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const deliveryFee = deliveryFees[province] || 300;
    const discount = discountCode === "FAYORA10" ? 0.10 : 0;
    const total = subtotal + deliveryFee - subtotal * discount;

    // Save order to MongoDB
    const newOrder = new Order({
      name,
      email,
      items,
      province,
      discountCode,
      deliveryFee,
      total
    });

    await newOrder.save();

    // Optional: Send confirmation email here

    res.status(200).json({
      success: true,
      total,
      deliveryFee,
      discountApplied: discount * 100,
      message: "Checkout successful. Order saved."
    });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}