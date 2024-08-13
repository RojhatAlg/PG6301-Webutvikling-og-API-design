const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const AuthUsers = require('./Routes/authUsers')
const AuthArticles = require('./Routes/authArticles')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', AuthUsers);
app.use('/articles', AuthArticles);

mongoose.connect(config.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));

app.listen(port, () => console.log(`Server running on port ${port}`));
