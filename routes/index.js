'use strict';
const express = require('express');
const router = express.Router();

const quote = require('./quote');
const folio = require('./folio');

router.use(quote);
router.use(folio);

module.exports = router;
