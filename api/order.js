// api/orders.js
import connectDB from '../config/db.js';
import orderRoutes from '../routes/orders.js';

export default async function handler(req, res) {
  await connectDB();

  // Vercel doesn't support Express routing, so we manually route
  if (req.method === 'POST') {
    return orderRoutes.createOrder(req, res);
  } else if (req.method === 'GET') {
    return orderRoutes.getOrders(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}