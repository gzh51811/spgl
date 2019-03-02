var express = require('express');
var router = express.Router();
var mongodb_gnj = require('../my_modules/mongodb_gnj');
/* GET users listing. */
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
      res.render('user', {
        name: result[0].name,
        email: result[0].email,
        admin: result[0].admin
      });
    }
  });
});



router.get('/ycsj', function (req, res, next) {
  console.log(req.query.sjnr)
  var sjnr = req.query.sjnr;

  if (sjnr == "个人信息") {
    // 个人信息 界面数据处理
    var user_gr = require('../my_modules/user/user_gr');
    user_gr(req, res);


  } else if (sjnr == "全部账号") {
    // 管理员账号 全部账号 界面数据处理
    if (req.query.qqsj == "syyh") {

      console.log("请求为获取所有用户")
      var user_syyh = require('../my_modules/user/user_syyh');
      user_syyh(req, res);
    } else if (req.query.qqsj == "tjss") {

      console.log("请求为搜索")
      var user_tjss = require('../my_modules/user/user_tjss');
      user_tjss(req, res);
    }

  }
});



router.post('/ycsj', function (req, res, next) {
  console.log(req.body.sjnr)
  var sjnr = req.body.sjnr;

  if (sjnr == "个人信息") {
    // 个人信息 界面数据处理 post

    if (req.body.qqsj == "yhmxg") {

      console.log("请求为修改用户名")

      //用户名修改请求 使用该模块处理
      var user_yhmxg = require('../my_modules/user/user_yhmxg');
      user_yhmxg(req, res);
    } else if (req.body.qqsj == "yxxg") {

      console.log("请求为修改邮箱")

      //邮箱修改请求 使用该模块处理
      var user_yxxg = require('../my_modules/user/user_yxxg');
      user_yxxg(req, res);
    } else if (req.body.qqsj == "mmxg") {

      console.log("请求为修改密码")

      //邮箱修改请求 使用该模块处理
      var user_mmxg = require('../my_modules/user/user_mmxg');
      user_mmxg(req, res);
    }

  } else if (sjnr == "全部账号") {

    if (req.body.qqsj == "xjyh") {

      console.log("请求为修改用户名")

      //用户名修改请求 使用该模块处理
      var user_xjyh = require('../my_modules/user/user_xjyh');
      user_xjyh(req, res);
    } else if (req.body.qqsj == "bjyh") {

      console.log("请求为编辑用户")

      //用户名修改请求 使用该模块处理
      var user_bjyh = require('../my_modules/user/user_bjyh');
      user_bjyh(req, res);
    } else if (req.body.qqsj == "scyh") {

      console.log("请求为删除用户")

      var user_scyh = require('../my_modules/user/user_scyh');
      user_scyh(req, res);
    }

  }
});

module.exports = router;