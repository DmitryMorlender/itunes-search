const jwt = require('jsonwebtoken');
const config = require('config');

const HTTP_STATUSES = require('../helpers/HTTP_STATUSES');

module.exports = function(req, res, next) {
  // get the token from the header
  const token = req.header('x-auth-token');
  // check if no token
  if (!token) {
    return next();
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(HTTP_STATUSES.NOT_AUTHORIZED).json({ msg: 'Token is not valid' });
  }
};
