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

module.exports.update = (req) => {
  console.log("HEYYYYYY", req.body);
}
