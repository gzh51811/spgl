var mongodb_gnj = require('../mongodb_gnj');

function user_mmxg(req, res) {
    console.log("开始验证修改用户名")

    //密码验证正则
    var pswRegex = /^[a-z0-9_-]{6,16}$/;

    if (pswRegex.test(req.body.xmm) && pswRegex.test(req.body.ymm)) {

        //验证当前账号密码 
        mongodb_gnj.cx("spgl", "user", {
            email: req.session.email,
            password: req.body.ymm
        }, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            if (result.length != 0) {

                //修改y用户邮箱
                mongodb_gnj.xg("spgl", "user", {
                    email: req.session.email
                }, {
                    password: req.body.xmm
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    req.session.email = null; // 删除session
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

module.exports = user_mmxg;