var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const bodyParser = require('body-parser');
const { tokenMiddleware } = require('./middleware/authMiddleware.js');
const cors = require("./middleware/CORSMiddleware.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const personnelRouter = require('./routes/personnel');
const roleRouter = require('./routes/role');
const jobRouter = require('./routes/job');
const deptRouter = require('./routes/dept');

var app = express();

//解决跨域
app.use(cors)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/personnel',tokenMiddleware, personnelRouter);
app.use('/api/role',tokenMiddleware, roleRouter);
app.use('/api/job',tokenMiddleware, jobRouter);
app.use('/api/dept',tokenMiddleware , deptRouter);

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
