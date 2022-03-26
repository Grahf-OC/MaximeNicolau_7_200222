const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    req.auth = {userId: userId};

    if (req.body.userId && req.body.userID !== userId) {
      throw 'Invalid user';
    }
    else {
      next();
    }
  }
  catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};