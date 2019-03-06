var mongodb_gnj = require('../mongodb_gnj');

function user_syyh(req, res) {
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

            // 管理员身份验证通过  验证邮箱是否存在

            //查询管理员账号
            mongodb_gnj.cx("spgl", "user", {
                admin: "true"
            }, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    return;
                }
                console.log(result)
                syyh.gly = result;

                //查询普通用户账号
                mongodb_gnj.cx("spgl", "user", {
                    admin: "lj"
                }, function (err, result) {
                    if (err) {
                        console.log('Error:' + err);
                        return;
                    }
                    console.log(result)
                    syyh.ptyh = result
                    console.log(syyh)
                    res.json(JSON.stringify(syyh));
                });
            });
        } else {
            res.json("no");
        }
    });



    // res.json("所有数据返回");
}

module.exports = user_syyh;