const express = require('express');
const router = express.Router();
const pagesCtrl = require('../controllers/pages');

router.get('/', pagesCtrl.get);


module.exports = router;