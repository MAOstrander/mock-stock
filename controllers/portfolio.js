'use strict';
const Stock = require('../models/my-stock');

module.exports.index = (req, res) => {
  Stock.find().sort('-sym').exec( (err, doc) => {
    if (err) throw err;

    if (doc) {
      res.send(doc);
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
