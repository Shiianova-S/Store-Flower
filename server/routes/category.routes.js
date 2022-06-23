const express = require('express');

const router = express.Router();
const { getCategories, getOneCategory } = require('../controllers/category.controller');

router.get('/', getCategories);
router.get('/:id', getOneCategory);

module.exports = router;
