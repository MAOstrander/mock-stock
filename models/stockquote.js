'use strict';
const mongoose = require('mongoose');

module.exports = mongoose.model('stock',
  mongoose.Schema({
    name: String,
    symbol: String,
    price: Number,
    qty: Number
  })
);
