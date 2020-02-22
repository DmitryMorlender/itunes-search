const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const HTTP_STATUSES = require('../../helpers/HTTP_STATUSES');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route GET api/auth
// @desc currently none
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const user = await User.findById(id).select('-password');
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).sned('Server error');
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
const userParamsValidator = [check('email', 'Please include a valid email').isEmail(), check('password', 'password is required').exists()];
router.post('/', userParamsValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const { password: userPassword } = user;
    const isMatch = await bcrypt.compare(password, userPassword);
    if (!isMatch) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Serever error');
  }
});

module.exports = router;
