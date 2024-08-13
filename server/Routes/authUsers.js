const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Log received data to confirm it's arriving correctly
  console.log('Received registration data:', { name, email, password });

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role: 'user' });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // Create a JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    "jwt-secret-key",
    { expiresIn: '90d' }
  );

  // Return the token and user data
  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      role: user.role
      // Add other user details if needed
    }
  });
});


module.exports = router;
