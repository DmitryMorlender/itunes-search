const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const HTTP_STATUSES = require('../../helpers/HTTP_STATUSES');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const {
      user: { id }
    } = req;
    const profile = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(HTTP_STATUSES.BAD_REQUEST).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
const userProfileValidator = [check('gender', 'gender must be specified').notEmpty(), check('familyStatus', 'family status must be specified').notEmpty()];
router.post('/', [auth, userProfileValidator], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { body: { gender = 'undefined', familyStatus = 'undefined' } = {}, user } = req;
  const profileFields = {};
  profileFields.user = user.id;
  if (gender) {
    profileFields.gender = gender;
  }
  if (familyStatus) {
    profileFields.familyStatus = familyStatus;
  }
  try {
    let profile = await Profile.findOne({ user: user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: user.id }, { $set: profileFields }, { new: true });
    } else {
      profile = new Profile(profileFields);
      await profile.save();
    }

    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'email', 'avatar']);
    return res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

// @route DELETE api/profile
// @desc Delete a profile
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    const {
      user: { id }
    } = req;

    await User.findOneAndRemove({ _id: id });

    return res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

// @route PUT api/profile/familyStatus
// @desc update family status
// @access Private
const familiyStatusValidator = [check('familyStatus', 'Family status must be specified').notEmpty()];
router.put('/familyStatus', [auth, familiyStatusValidator], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const {
      user: { id },
      body: { familyStatus }
    } = req;

    const profile = await Profile.findOne({ user: id });
    profile.familyStatus = familyStatus;

    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

module.exports = router;
