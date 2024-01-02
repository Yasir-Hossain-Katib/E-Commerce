// routes/protectedRoute.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  // Accessible only if the JWT is valid
  res.json({ message: 'Access granted!' });
});

module.exports = router;
