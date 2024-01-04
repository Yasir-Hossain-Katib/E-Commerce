// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authenticateUser = async (req, res, next) => {
  try {
      // Get token from request header
      const token = req.headers.authorization;

      // Verify the token and extract user information
      const decodedToken = jwt.verify(token, jwtConfig.secretKey);
      req.user = decodedToken;

      // Continue processing
      next();
  } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports=authenticateUser;