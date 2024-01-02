// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

module.exports = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, jwtConfig.secretKey);
    req.userId = decodedToken.userId; // Attach the user ID to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
