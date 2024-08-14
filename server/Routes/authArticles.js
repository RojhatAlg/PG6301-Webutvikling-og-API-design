const express = require('express');
const router = express.Router();
const Article = require('../Models/Article');
const verifyToken = require('../Middleware/VerifyToken');


router.get('/my-articles', verifyToken, async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id }).populate('author', 'name email');
    res.json(articles);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Create a new article
router.post('/', verifyToken, async (req, res) => {
  const { title, category, text } = req.body;

  if (!title || !category || !text) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if the article already exists
    const existingArticle = await Article.findOne({ title });
    if (existingArticle) {
      return res.status(400).json({ msg: 'Article with this title already exists' });
    }

    // Create the article
    const newArticle = new Article({
      title,
      category,
      text,
      author: req.user.id
    });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

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

// Update an article
router.put('/:id', verifyToken, async (req, res) => {
  const { title, category, text } = req.body;

  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: 'Article not found' });

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to edit this article' });
    }

    article.title = title || article.title;
    article.category = category || article.category;
    article.text = text || article.text;

    await article.save();
    res.json(article);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete an article
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: 'Article not found' });

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this article' });
    }

    // Use deleteOne instead of remove
    await Article.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Article removed' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
