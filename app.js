var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

//应用模块
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'trwetwyacfdagy',
  cookie: {
    maxAge: 1000 * 60 * 120, // 设置 session 的有效时间，单位毫秒
  }
}));

//请求身份验证
app.use(function (req, res, next) {

  // 验证当前令牌状态
  if (req.session.email) {
    // 令牌状态 已登录
    if (req.url == "/login") {
      // 如果请求未登录页 将链接重定向到主页
      res.redirect('/');
    }
    next()
  } else {
    // 令牌状态 未登录
    if (req.url == "/login" || req.url == "/login/dl") {
      // 如果请求未登录页 将请求传递给下一个处理程序
      next();
    } else {
      // 请求非登录页 将链接重定向到登录页
      res.redirect('/login');
    }
  }
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;