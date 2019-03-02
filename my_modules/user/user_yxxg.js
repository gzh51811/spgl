var mongodb_gnj = require('../mongodb_gnj');

function user_yxxg(req, res) {
    console.log("开始验证修改用户名")
    // 邮箱验证正则
    var yxRegex = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
    //密码验证正则
    var pswRegex = /^[a-z0-9_-]{6,16}$/;

    if (yxRegex.test(req.body.xyx) && pswRegex.test(req.body.mm)) {

        //验证当前账号密码 
        mongodb_gnj.cx("spgl", "user", {
            email: req.session.email,
            password: req.body.mm
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
                    email: req.body.xyx
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

module.exports = user_yxxg;