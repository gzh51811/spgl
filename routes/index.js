var express = require('express');
var router = express.Router();
var mongodb_gnj = require('../my_modules/mongodb_gnj');


/* 无参数请求 */
router.get('/', function (req, res, next) {

  // 查询数据库
  mongodb_gnj.cx("spgl", "user", {
    email: req.session.email
  }, function (err, result) {
    if (err) {
      console.log('Error:' + err);
      return;
    }
    if (result.length != 0) {
      console.log(result)
      res.render('index', {
        name: result[0].name
      });
    }
  });


});
router.get('/ycsj', function (req, res, next) {
  console.log(req.query.sjnr)
  var sjnr = req.query.sjnr;

  if (sjnr == "数据概览") {


  } else if (sjnr == "全部商品") {


  } else if (sjnr == "全部订单") {


  }
});

router.post('/ycsj', function (req, res, next) {
  console.log(req.body.sjnr)
  var sjnr = req.body.sjnr;

  if (sjnr == "数据概览") {

  } else if (sjnr == "全部商品") {

    if (req.body.qqsj == "fbsp") {

      console.log("请求为发布商品")
      var index_fbsp = require('../my_modules/index/index_fbsp');
      index_fbsp(req, res);

    }

  } else if (sjnr == "全部订单") {

  }

})

module.exports = router;