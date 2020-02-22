const HTTP_STATUSES = require('../helpers/HTTP_STATUSES');
const Search = require('../models/Search');

module.exports = async function(req, res, next) {
  try {
    const { user, query: { offset = '', term = '' } = {} } = req;
    const isNewSearch = Number(offset) === 0;
    if (user && isNewSearch) {
      await Search.updateOne(
        { _id: user.id },
        {
          $inc: { [`term.${term}`]: 1 }
        },
        { upsert: true }
      );
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(HTTP_STATUSES.NOT_AUTHORIZED).json({ msg: 'Something went wrong' });
  }
};
