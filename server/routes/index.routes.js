const express = require('express');

const router = express.Router();
const userRouter = require('./user.routes');
const profileRouter = require('./profile.routes');
// const auth = require('../middlewares/auth.middleware');

router.use('/', userRouter);
router.use('/', profileRouter);

module.exports = router;
