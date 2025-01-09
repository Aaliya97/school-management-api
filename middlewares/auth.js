const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};
