const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');
const HTTP_STATUSES = require('../../helpers/HTTP_STATUSES');
const Search = require('../../models/Search');
const populateUser = require('../../middleware/populate-user');
const updateSearches = require('../../middleware/update-searches');
const auth = require('../../middleware/auth');

// @route GET api/search
// @desc currently none
// @access Public
router.get('/', [populateUser, updateSearches], async (req, res) => {
  try {
    const { user, query } = req;
    const stringifiedQuery = querystring.stringify(query);

    const response = await axios.get(`https://itunes.apple.com/search?${stringifiedQuery}`);
    res.json({ ...response.data });
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

router.get('/top-searches', auth, async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          _id: 0,
          terms: { $objectToArray: '$term' }
        }
      },
      {
        $unwind: {
          path: '$terms',
          includeArrayIndex: 'true'
        }
      },
      { $sort: { 'terms.v': -1 } }, //ascending order by value
      { $limit: 10 },
      { $project: { name: '$terms.k', value: '$terms.v' } }
    ]);

    res.json(topSearches);
  } catch (error) {
    console.error(error.message);
    res.status(HTTP_STATUSES.SERVER_ERROR_500).send('Server error');
  }
});

module.exports = router;
