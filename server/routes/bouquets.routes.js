const express = require('express');

const router = express.Router();

const {
  getAllBouquets,
  addBouquet,
  updateBouquet,
  deleteBouquet,
} = require('../controllers/bouquets.controller');

router.get('/', getAllBouquets);
router.post('/', addBouquet);
router.post('/edit/:id', updateBouquet);
router.delete('/:id', deleteBouquet);

module.exports = router;
