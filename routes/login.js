//处理用户登陆请求
var express = require('express');
var router = express.Router();

//请求登陆页面
router.get('/', function (req, res, next) {
  res.render('login');
});

//用户登陆请求
router.post('/dl', function (req, res) {
  console.log("用户登陆请求开始处理")
  var login_dl = require('../my_modules/login_dl');
  console.log("登陆处理模块")
  login_dl(req, res);
})

//用户退出请求
router.post('/tc', function (req, res) {
  res.json(JSON.stringify("ok"));
})



module.exports = router;