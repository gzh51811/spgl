var mongodb_gnj = require('../mongodb_gnj');
var objectId = require('mongodb').ObjectId;

function index_tjsp(req, res, urls) {
    //将商品信息写入数据库
    //验证当前操作用户是否位为理员
    mongodb_gnj.cx("spgl", "user", {
        email: req.session.email,
        admin: "true"
    }, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        if (result.length != 0) {
            console.log("管理员身份验证通过")

            // 管理员身份验证通过 
            // 生成时间戳
            var scsjc = Date.parse(new Date());
            // 上架状态
            if (req.body.sj == "上架") {
                var sjzt = "csz"
            } else {
                var sjzt = "yxj"
            }



            // 判断是否有修改id
            if (req.body.xgspid != "") {
                //判断主图是否修改
                var ztlj
                if (req.body.ztlj == "") {
                    ztlj = urls
                } else {
                    ztlj = req.body.ztlj
                }

                //修改商品
                mongodb_gnj.xg("spgl", "sp", {
                    _id: objectId(req.body.xgspid)
                }, {
                    ztlj: ztlj,
                    spbt: req.body.spmc,
                    spjg: req.body.jg,
                    spkc: req.body.kc,
                    spzt: sjzt
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.log("商品修改成功")
                    res.json("ok");
                });
            } else {
                //添加商品到数据库
                mongodb_gnj.tj("spgl", "sp", [{
                    ztlj: urls,
                    spbt: req.body.spmc,
                    spjg: req.body.jg,
                    spkc: req.body.kc,
                    fbsj: scsjc,
                    spzt: sjzt
                }], function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.log("商品成功写入")
                    res.json("ok");
                });
            }



        } else {
            res.json("no");
        }
    });

}

module.exports = index_tjsp;