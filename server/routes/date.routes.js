const express = require('express');

const router = express.Router();
const { getEvent, getEvent1 } = require('../controllers/date.contoller');

router.get('/', getEvent);
router.get('/1', getEvent1);

module.exports = router;
