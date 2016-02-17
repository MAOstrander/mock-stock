'use strict';
const request = require('request');

const Stock = require('../models/my-stock');

module.exports.index = (req, res) => {
  res.render('quote');
};

module.exports.findstock = (req, res) => {
  const symbol = req.body.sym;
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${symbol}`;
  request.get(url, (err, response, body) => {
    if (err) throw err;

    const thing = JSON.parse(body);

    const myQuote = new Stock({
      name: thing.Name,
      symbol: thing.Symbol,
      qty: 3
    });


    myQuote.save( (err, result) => {
      if (err) throw err;
      console.log("TRYING TO SAVE", result);
    });

    console.log(myQuote);
    const stockName = thing.Name;
    console.log(stockName);

    res.render('quotedetails', {
      name: thing.Name,
      symbol: thing.Symbol,
      price: thing.LastPrice
    });
  });
};
