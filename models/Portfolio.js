const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: String,  // 'aldo' or 'uchie'
    required: true
  },
  name: {
    type: String,
    required: true
  },
  capital: {
    type: Number,
    required: true
  },
  monthlyInterest: {
    type: [Number],
    default: Array(12).fill(0)
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);