const express = require('express');
const router = express.Router();
const projetCtrl = require('../controllers/projet');

router.get('/', projetCtrl.get);
router.get('/:id', projetCtrl.oneProjet);

module.exports = router;