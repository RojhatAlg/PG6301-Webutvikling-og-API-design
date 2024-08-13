const jwt = require('jsonwebtoken');
const users = require('../Models/Users'); 
const secret = 'jwt-secret-key'; 

const login = (req, res) => {
  const { name, password } = req.body;
  const user = users.find(u => u.name === name && u.password === password);
  if (!user) return res.status(401).send('Invalid credentials');
  
  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '90d' });
  res.json({ token });
};

module.exports = { login };
