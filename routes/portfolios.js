const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Get all portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get portfolios by user
router.get('/user/:user', async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.params.user });
    res.json(portfolios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a portfolio
router.post('/', async (req, res) => {
  try {
    const newPortfolio = new Portfolio({
      user: req.body.user,
      name: req.body.name,
      capital: req.body.capital,
      monthlyInterest: req.body.monthlyInterest,
      description: req.body.description
    });

    const portfolio = await newPortfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a portfolio
router.put('/:id', async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    
    portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(portfolio);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a portfolio
router.delete('/:id', async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    
    await Portfolio.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Portfolio removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;