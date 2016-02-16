'use strict';
const request = require('request');

const Stock = require('../models/stockquote');

module.exports.index = (req, res) => {
  res.render('quote');
};

module.exports.findstock = (req, res) => {
  const symbol = req.body.sym;
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${symbol}`;
  request.get(url, (err, response, body) => {
    if (err) throw err;

    const thing = JSON.parse(body);

    const myStock = new Stock({
      name: thing.Name,
      symbol: thing.Symbol,
      price: thing.LastPrice
    });

    console.log(myStock);
    const stockName = thing.Name;
    console.log(stockName);

    res.render('quotedetails', {
      sym: thing.Name
    });
  });
};
