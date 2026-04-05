const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const header = req.header('Authorization');

    if (!header) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const token = header.startsWith('Bearer ')
      ? header.split(' ')[1]
      : header;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // must contain role
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;