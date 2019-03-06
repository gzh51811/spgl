var mongodb_gnj = require('../mongodb_gnj');

function user_yhmxg(req, res) {
    console.log("开始验证修改用户名")
    // 正则验证当前用户名
    console.log(req.body.xyhm)
    var usernameRegex = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
    if (usernameRegex.test(req.body.xyhm)) {

        mongodb_gnj.xg("spgl", "user", {
            email: req.session.email
        }, {
            name: req.body.xyhm
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
}

module.exports = user_yhmxg;