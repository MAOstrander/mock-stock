'use strict';
// const request = require('request');
const Stock = require('../models/my-stock');

module.exports.index = (req, res) => {
  Stock.find().sort('-sym').exec( (err, doc) => {
    if (err) throw err;

    if (doc) {
      console.log(">>>>>>>>>>>>>>>", doc);
      const stockArray = [];

      doc.forEach( (thing) => {

        //  This was a decent idea to get up to date stock info, but it hits the API too quickly and gets rejected
        // const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${thing.symbol}`;
        // request.get(url, (err, response, body) => {
        //   if (err) throw err;

        //   var singleStock = JSON.parse(body);
        //   var stockPrice = singleStock.LastPrice;
        //   thing.price = stockPrice;
        stockArray.push(thing);
        // })

      })

      console.log("???????????????", stockArray);
      res.render('index', {
        test: stockArray
      });
      return;
    } else {

      res.render('index', {
        sym: 'GOOG',
        comp: 'Alphabet Inc',
        price: '$689.67',
        qty: '5'
      });

    }
  });



}

module.exports.update = (req, res) => {
  console.log(req.body);
  const thisPrice = req.body.price
  const buyOrSell = req.body.dowhat;
  let howMany;

  if (buyOrSell === 'buy') {
    howMany = req.body.qty;
  } else if (buyOrSell === 'sell') {
    howMany = req.body.qty * -1; // eslint-disable-line no-magic-numbers
  }

  const myQuote = new Stock({
    name: req.body.name,
    symbol: req.body.sym,
    qty: howMany
  });


  myQuote.save( (err, result) => {
    if (err) throw err;

    console.log("TRYING TO SAVE", result);
    res.render('index', {
      sym: myQuote.symbol,
      comp: myQuote.name,
      price: thisPrice,
      qty: myQuote.qty
    });
  });

}
