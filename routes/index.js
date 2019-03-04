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

    console.log("用户登陆请求开始处理")
    var index_gl = require('../my_modules/index/index_gl');
    index_gl(req, res);


  } else if (sjnr == "全部商品") {
    var index_sp = require('../my_modules/index/index_sp');
    index_sp(req, res);

  } else if (sjnr == "全部订单") {
    var index_dd = require('../my_modules/index/index_dd');
    index_dd(req, res);

  }
});
router.post("/ycsj", function (req, res, next) {
  console.log(req.body.sjnr)
  var sjnr = req.body.sjnr;
  res.json("aa")
  // if ("sjnr" == "" || "所有订单") {
  //   console.log("请求所有订单")
  //   var index_cha = require("../my_modules/index/index_chaxu");
  //   index_cha(req,res)
  // }else if("sjnr"=="待付款"){
  //   var index_cha = require("../my_modules/index/index_chaxu");
  //   index_cha(req,res)
  // }
})
module.exports = router;