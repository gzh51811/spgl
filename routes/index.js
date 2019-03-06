var express = require('express');
var router = express.Router();
var mongodb_gnj = require('../my_modules/mongodb_gnj');
var multer = require('multer');

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
    if (req.query.qqsj == "sjgl") {

      console.log("请求为获取概览数据")
      var index_glsj = require('../my_modules/index/index_glsj');
      index_glsj(req, res);

    }

  } else if (sjnr == "全部商品") {

    if (req.query.qqsj == "splb") {

      console.log("请求为商品列表数据")

      var index_splbsj = require('../my_modules/index/index_splbsj');
      index_splbsj(req, res);
      return
    }

  } else if (sjnr == "全部订单") {


  }
});

router.post('/ycsj', function (req, res, next) {
  console.log("进入 ycsj")
  console.log(req.body.sjnr)
  var sjnr = req.body.sjnr;

  if (sjnr == "数据概览") {

  } else if (sjnr == "全部商品") {

    if (req.body.qqsj == "sjsp") {
      console.log("请求为上架商品")

      var index_splbsjsp = require('../my_modules/index/index_splbsjsp');
      index_splbsjsp(req, res);
    } else if (req.body.qqsj == "xjsp") {
      console.log("请求为下架架商品")
      var index_splbxjsp = require('../my_modules/index/index_splbxjsp');
      index_splbxjsp(req, res);
    } else if (req.body.qqsj == "scsp") {
      console.log("请求为删除商品")
      var index_splbscsp = require('../my_modules/index/index_splbscsp');
      index_splbscsp(req, res);
    }

  } else if (sjnr == "全部订单") {

  }

})

// 商品发布
var ssn = "";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/spt')
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    //给图片加上时间戳格式防止重名名
    //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
    ssn = file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]
    cb(null, ssn);
  }
});
var upload = multer({
  storage: storage
});


router.post('/ycsj/tjsp', upload.single('zt'), function (req, res) {
  console.log("开始图片上传处理")
  //主图的路径地址
  console.log(req.body.CustomField)
  var url = 'spt/' + ssn;

  var index_tjsp = require('../my_modules/index/index_tjsp');
  index_tjsp(req, res, url);


})

module.exports = router;