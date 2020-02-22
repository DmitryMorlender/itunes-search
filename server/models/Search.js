const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  term: {
    type: mongoose.Schema.Types.Map,
    of: Number,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('search', SearchSchema);
