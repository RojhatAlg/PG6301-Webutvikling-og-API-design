const express = require('express');
const router = express.Router();
const Article = require('../Models/Article');
const User = require('../models/User');

// Hent alle artikler
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().populate('author');
    res.json(articles);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Hent artikkel etter ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author');
    if (!article) return res.status(404).json({ msg: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Opprett artikkel
router.post('/', async (req, res) => {
  const { title, category, text, author, imageUrl } = req.body;

  if (!title || !category || !text) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const existingArticle = await Article.findOne({ title });
    if (existingArticle) return res.status(400).json({ msg: 'Article already exists' });

    const newArticle = new Article({ title, category, text, author, imageUrl });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Oppdater artikkel
router.put('/:id', async (req, res) => {
  const { title, category, text, imageUrl } = req.body;

  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: 'Article not found' });

    // Check if the user is the author
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    article.title = title || article.title;
    article.category = category || article.category;
    article.text = text || article.text;
    article.imageUrl = imageUrl || article.imageUrl;

    await article.save();
    res.json(article);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Slett artikkel
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: 'Article not found' });

    // Check if the user is the author
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await article.remove();
    res.json({ msg: 'Article removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
