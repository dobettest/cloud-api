var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var companyRouter = require('./routes/company');
var roleRouter = require('./routes/role');
var vblogRouter = require('./routes/vblog');
var storageRouter = require('./routes/storage');
var folderRouter = require('./routes/folder')
var errors = require('./type/errors.json');
var cors = require('my-cors');
var jwt = require('./lib/jwt');
var app = express();
app.use(cors());
require('./lib/mongo');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt({
  allows: ['/test','/storage','/vblog', '/user/upload', '/user/tim/createTicket', '/user/login', '/user/checkCodeByPhone', '/user/getCodeByPhone', '/user/loginByPhone', '/user/getImgCode', '/user/getCodeByMail', '/user/checkCodeByMail', '/role/create', '/company/create'],
  secret: 'dadb0a1798'
}))
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', companyRouter);
app.use('/role', roleRouter);
app.use('/vblog', vblogRouter);
app.use('/storage', storageRouter);
app.use('/folder', folderRouter);
app.use('/test',async function (req,res,next) {
  try {
    res.json({
      data:'test'
    })
  } catch (error) {
    next(error)
  }
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (error, req, res, next) {
  res.json({
    errStr: error['message']
  })
});
module.exports = app;
