const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');
    
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).send('Forbidden');
      req.user = user;
      next();
    });
  };

  module.exports = authenticateJWT;