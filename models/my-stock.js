'use strict';
const mongoose = require('mongoose');

module.exports = mongoose.model('mystock',
  mongoose.Schema({
    name: String,
    symbol: String,
    qty: Number,
    price: Number
  })
);
