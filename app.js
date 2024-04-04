var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/webAdminRouter');
var database = require('./config/db');
var userRouter = require('./routes/api/userRouter');
var imageUserRouter = require('./routes/api/imageUserRouter');
var categoryRouter = require('./routes/api/categoryRouter');
var productRouter = require('./routes/api/productRouter');
var imageProductRouter = require('./routes/api/imageProductRouter');
var cartRouter = require('./routes/api/cartRouter');
var oderRouter = require('./routes/api/oderRouter');
var oderDetailRouter = require('./routes/api/oderDetailRouter');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/api/user',userRouter);
app.use('/api/uploaduser',imageUserRouter);
app.use('/api/category',categoryRouter);
app.use('/api/product',productRouter);
app.use('/api/uploadproduct',imageProductRouter);
app.use('/api/cart',cartRouter);
app.use('/api/oder',oderRouter);
app.use('/api/oderdetail',oderDetailRouter);
database.connect();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
