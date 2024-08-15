// ArticlesController.js
const express = require('express');
const router = express.Router();
const Article = require('../Models/Article');

// Fetch all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email');
    res.json(articles);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Fetch a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email');
    if (!article) return res.status(404).json({ msg: 'Article not found' });
    res.json(article);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
