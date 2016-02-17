'use strict';
const mongoose = require('mongoose');

module.exports = mongoose.model('stockquote',
  mongoose.Schema({
    name: String,
    symbol: String,
    price: Number
  })
);
