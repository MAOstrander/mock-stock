'use strict';

module.exports.index = (req, res) => {
  res.render('index', {
    sym: 'GOOG',
    comp: 'Alphabet Inc',
    price: '$689.67',
    qty: '5'
  });
}
