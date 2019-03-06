var mongodb_gnj = require('../mongodb_gnj');

function user_syyh(req, res) {
    console.log("开始删除用户")

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
            //删除数据库
            mongodb_gnj.sc("spgl", "user", {
                email: req.body.yhyx,
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

}

module.exports = user_syyh;