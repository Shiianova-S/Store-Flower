require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload');

const app = express();

//* Импорт роутов
const indexRouter = require('./routes/index.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRoutes = require('./routes/category.routes');
const bouquetsRouter = require('./routes/bouquets.routes');
const orderRouter = require('./routes/order.routes');
// const cardRouter = require('./routes/card.routes');

//* config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

const corsConfig = {
  // origin: true,
  origin: ['http://localhost:3000', 'https://let-it-flow-project.herokuapp.com/'],
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

//* use routes
app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/categories', categoryRoutes);
app.use('/bouquets', bouquetsRouter);
app.use('/order', orderRouter);
// app.use('/card', cardRouter);


app.get('*', (req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
