const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/note');
const auth = require('../middleware/auth');

router.post('/', auth, noteCtrl.post);
router.get('/', auth, noteCtrl.get);
router.delete('/', auth, noteCtrl.delete);

module.exports = router;