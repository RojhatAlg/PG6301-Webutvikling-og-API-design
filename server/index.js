const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const AuthRoutes = require('./Routes/AuthRoutes'); // Ensure this is the correct path

const app = express();
const port = 8080;
const secret = 'jwt-secret-key';

// CORS configuration
app.use(cors({
    origin: 'http://localhost:1234', // Adjust this as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(config.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/auth', AuthRoutes); // Fixed the path here

app.get('/admin', authenticateJWT, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    res.send('Welcome Admin!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
