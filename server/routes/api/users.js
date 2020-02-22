const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const HTTP_STATUSES = require('../../helpers/HTTP_STATUSES');

const User = require('../../models/User');

// @route POST api/users
// @desc register user
// @access Public
router.post(
  '/',
  [
    check('name', "user can't be empty")
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if the user exist
      let user = await User.findOne({ email });
      if (user) {
        return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: [{ msg: 'User is already exist' }] });
      }
      // get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      user = new User({
        name,
        email,
        password,
        avatar
      });

      // encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return the JWT
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
  }
);

// @route GET api/users
// @desc get all users
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    // See if the user exist
    let users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Serever error');
  }
});

// @route DELETE api/users/:user_id
// @desc delete user
// @access Private
router.delete('/:user_id', auth, async (req, res) => {
  try {
    const { params } = req;

    const aa = await User.findOne({ _id: mongoose.Types.ObjectId(params.user_id) });

    return res.json({ msg: 'User deleted ' + params.user_id, aa });
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

module.exports = router;
