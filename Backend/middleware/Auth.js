const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) return res.status(401).json({ msg: 'User not found' });

    req.user = user; // ✅ Attach user to request
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;
