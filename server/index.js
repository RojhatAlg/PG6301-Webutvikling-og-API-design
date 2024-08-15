const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

// Route handlers
const AuthUsers = require('./Routes/authUsers');
const AuthArticles = require('./Routes/authArticles');
const ArticlesController = require('./Controllers/ArticlesController'); // New route for non-authenticated article routes

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Route middleware
app.use('/users', AuthUsers);
app.use('/articles', ArticlesController);
app.use('/admin-articles', AuthArticles); 

// Only connect to the database if this is not in the test environment
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("Failed to connect to MongoDB:", err));
}

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app; 
