const express = require('express');

const router = express.Router();
const { addOrder, getOrdersUser } = require('../controllers/order.controller');

router.post('/', addOrder);
router.get('/:id', getOrdersUser);

module.exports = router;
