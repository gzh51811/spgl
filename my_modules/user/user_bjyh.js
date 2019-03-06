var mongodb_gnj = require('../mongodb_gnj');

function user_bjyh(req, res) {
    console.log("开始编辑用户" + req.body.bjyx)

    //密码验证正则
    var pswRegex = /^[a-z0-9_-]{6,16}$/;

    // 邮箱验证正则
    var yxRegex = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;

    // 用户名正则
    var hymRegex = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
    console.log("等待正则验证" + req.body.mm + "  " + req.body.yx + "  " + req.body.yhm)
    if (pswRegex.test(req.body.mm) && yxRegex.test(req.body.yx) && hymRegex.test(req.body.yhm)) {
        console.log("开始验证管理员身份")
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

                //添加用户到数据库

                //判断新用户身份
                var yhqx = "lj"
                if (req.body.qx == "管理员") {
                    yhqx = "true"
                } else {
                    yhqx = "lj"
                }

                mongodb_gnj.xg("spgl", "user", {
                    email: req.body.bjyx
                }, {
                    name: req.body.yhm,
                    password: req.body.mm,
                    email: req.body.yx,
                    admin: yhqx
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    res.json("ok");
                });

            } else {
                res.json("no");
            }
        });


    } else {
        res.json("no");
    }
}

module.exports = user_bjyh;