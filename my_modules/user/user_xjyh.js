var mongodb_gnj = require('../mongodb_gnj');

function user_xjyh(req, res) {
    console.log("开始添加新用户")

    //密码验证正则
    var pswRegex = /^[a-z0-9_-]{6,16}$/;

    // 邮箱验证正则
    var yxRegex = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;

    // 用户名正则
    var hymRegex = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;

    if (pswRegex.test(req.body.mm) && yxRegex.test(req.body.yx) && hymRegex.test(req.body.yhm)) {

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

                // 管理员身份验证通过  验证邮箱是否存在
                mongodb_gnj.cx("spgl", "user", {
                    email: req.body.yx,
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    if (result.length == 0) {
                        console.log("此邮箱未注册过")
                        // 此邮箱未注册 开始写入新用户

                        //添加用户到数据库

                        //判断新用户身份
                        var yhqx = "lj"
                        if (req.body.qx == "管理员") {
                            yhqx = "true"
                        } else {
                            yhqx = "lj"
                        }

                        mongodb_gnj.tj("spgl", "user", [{
                            name: req.body.yhm,
                            password: req.body.mm,
                            email: req.body.yx,
                            admin: yhqx
                        }], function (err, result) {
                            if (err) {
                                console.log('Error:' + err);
                                return;
                            }
                            console.log("用户写入成功")
                            res.json("ok");
                        });

                    } else {
                        res.json("no");
                    }
                });


            } else {
                res.json("no");
            }
        });

    } else {
        res.json("no");
    }
}

module.exports = user_xjyh;