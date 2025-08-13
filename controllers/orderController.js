exports.placeOrder = (req, res) => {
  const { customer, items, subtotal, deliveryFee, total } = req.body;

  if (!customer || !items) {
    return res.status(400).json({ error: 'Missing order data' });
  }

  // For now, just log the order and return success
  console.log('New Order:', {
    customer,
    items,
    subtotal,
    deliveryFee,
    total
  });

  return res.status(200).json({ ok: true, message: 'Order received' });
};