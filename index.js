// Load environment variables from .env
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();


const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orders'); // ✅ Import orders route

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middleware ---
app.use(cors());             // Allow cross-origin requests
app.use(express.json());     // Parse JSON bodies

// --- Orders route ---
app.use('/api/orders', orderRoutes);

// --- Sample test route ---
app.get('/', (req, res) => {
  res.json({ message: 'FAYORA backend is running 🚀' });
});

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});