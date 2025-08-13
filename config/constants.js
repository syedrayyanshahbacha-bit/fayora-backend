// config/constants.js
// config/constants.js

module.exports = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  CURRENCY: process.env.CURRENCY || 'PKR',

  DELIVERY_BASE: parseInt(process.env.DELIVERY_BASE) || 300,
  DELIVERY_FEE: parseInt(process.env.DELIVERY_FEE) || 300,
  DISCOUNT_PERCENT: parseFloat(process.env.DISCOUNT_PERCENT) || 10,

  DELIVERY_AREAS: JSON.parse(process.env.DELIVERY_AREAS_JSON || '{}'),
  DISCOUNT_CODES: JSON.parse(process.env.DISCOUNT_CODES_JSON || '{}')
};