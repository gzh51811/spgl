var mongodb_gnj = require('../my_modules/mongodb_gnj');

function login_dl(req, res) {
    console.log("开始数据库验证")
    //检查是否为登陆
    if (req.body.password) {
        // 输出 JSON 格式
        objs = {
            email: req.body.email,
            password: req.body.password
        };

        //检查是否正确
        mongodb_gnj.cx("spgl", "user", objs, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            if (result.length != 0) {
                console.log("登陆请求数据库验证成功")
                req.session.email = objs.email;
                console.log("session添加成功")
                res.json(JSON.stringify("ok"));
            } else {
                console.log("登陆请求数据库验证失败")
                res.json(JSON.stringify("on"));
            }
        });
    }
}

module.exports = login_dl;