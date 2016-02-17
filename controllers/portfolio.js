'use strict';
// const request = require('request');
const Stock = require('../models/my-stock');

module.exports.index = (req, res) => {
  Stock.find().sort('-sym').exec( (err, doc) => {
    if (err) throw err;

    if (doc) {
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

      res.render('index', {
        test: stockArray
      });
      return;
    } else {

      res.render('index', {
        sym: 'No Stocks',
        comp: 'click Get Quotes',
        price: 'to get started',
        qty: 'buying and selling'
      });

    }
  });
}

module.exports.update = (req, res) => {
  console.log(req.body);
  const thisPrice = Number(req.body.price);
  const buyOrSell = req.body.dowhat;
  let howMany;
  let message = 'Transaction succesful!';
  let updateID;
  const stockArray = [];

  Stock.findOne({symbol:req.body.sym}, (err, doc) => {
    if (err) throw err;

    if (doc) {
      updateID = doc._id;
    }
  });


  if (buyOrSell === 'buy') {
    howMany = parseInt(req.body.youhave) + parseInt(req.body.qty);
  } else if (buyOrSell === 'sell') {
    howMany = req.body.youhave - req.body.qty;
    if (howMany < 0) {
      howMany = 0;
      message = 'Attempted to sell more than quantity owned, sold all available instead.';
    }
  }

  const myQuote = new Stock({
    name: req.body.name,
    symbol: req.body.sym,
    price: thisPrice,
    qty: howMany
  });

  if (updateID) {
    myQuote.findById(updateID, (err, foundStock) => {
      if (err) throw (err);

      foundStock.qty = howMany;
      foundStock.save( (err) => {
        if (err) throw (err);

        console.log("TRYING TO UPDATE", foundStock);
        Stock.find().sort('-sym').exec( (err, doc) => {
          if (err) throw err;

          doc.forEach( (thing) => {
            stockArray.push(thing);
          })
        }).then( () => {

          res.render('index', {
            test: stockArray,
            message: message
          });
        }); // END THEN
      });
    });
  } else {
    myQuote.save( (err, result) => {
      if (err) throw err;

      console.log("TRYING TO SAVE", result);
      Stock.find().sort('-sym').exec( (err, doc) => {
        if (err) throw err;

        doc.forEach( (thing) => {
          stockArray.push(thing);
        })
      }).then( () => {

        res.render('index', {
          test: stockArray,
          message: message
        });
      }); // END THEN
    });
  }


}
