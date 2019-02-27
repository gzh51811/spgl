var express = require('express');
var router = express.Router();

/* 无参数请求 */
router.get('/', function(req, res, next) {
  res.render('index');
});

// 请求数据预览
router.get('/sjyl', function(req, res, next) {
  res.render('index_lb/sjyl');
});


module.exports = router;
