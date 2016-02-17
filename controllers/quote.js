'use strict';
const request = require('request');
const Stock = require('../models/my-stock');

module.exports.index = (req, res) => {
  res.render('quote');
};

module.exports.findstock = (req, res) => {
  const symbol = req.body.sym;
  let youhave = 0;

  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${symbol}`;
  request.get(url, (err, response, body) => {
    if (err) throw err;

    const thing = JSON.parse(body);

    Stock.findOne({symbol:thing.Symbol}, (err, doc) => {
      if (err) throw err

      if (doc) {
        youhave = doc.qty;
      }
    })
    .then( () => {
      res.render('quotedetails', {
        name: thing.Name,
        symbol: thing.Symbol,
        price: thing.LastPrice,
        youhave: youhave
      });
    })

  });
};
