const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res, next) => {
  // try {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN);
  const { userId } = decodedToken;

  req.auth = { userId };

  next();
  /* } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  } */
};
