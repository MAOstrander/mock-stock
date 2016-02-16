'use strict';
const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/quote');

router.get(`/quote`, ctrl.index);

module.exports = router;
