var mongodb_gnj = require('../mongodb_gnj');

function user_tjss(req, res) {
    console.log("开始获取所有用户")
    //数据
    var syyh = {
        gly: [],
        ptyh: []
    };
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
            if (req.query.sszd == "搜索用户名") {

                //查询字段为用户名查询

                //查询管理员账号
                mongodb_gnj.cx("spgl", "user", {
                    admin: "true",
                    name: {
                        $regex: req.query.zdssct
                    }
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.log(result)
                    syyh.gly = result;

                    //查询普通用户账号
                    mongodb_gnj.cx("spgl", "user", {
                        admin: "lj",
                        name: {
                            $regex: req.query.zdssct
                        }
                    }, function (err, result) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.log(result)
                        syyh.ptyh = result
                        res.json(JSON.stringify(syyh));

                    });
                });
            } else {
                //查询字段为邮箱查询

                //查询管理员账号

                mongodb_gnj.cx("spgl", "user", {
                    admin: "true",
                    email: {
                        $regex: req.query.zdssct
                    }
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.log(result)
                    syyh.gly = result;

                    //查询普通用户账号
                    mongodb_gnj.cx("spgl", "user", {
                        admin: "lj",
                        email: {
                            $regex: req.query.zdssct
                        }
                    }, function (err, result) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.log(result)
                        syyh.ptyh = result
                        res.json(JSON.stringify(syyh));

                    });
                });
            }

            // {$regex:reg}


        } else {
            res.json("no");
        }
    });
}

module.exports = user_tjss;