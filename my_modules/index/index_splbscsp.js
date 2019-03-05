var mongodb_gnj = require('../mongodb_gnj');
var objectId = require('mongodb').ObjectId;

function index_splbscsp(req, res, urls) {
    // 验证是否下架
    mongodb_gnj.cx("spgl", "sp", {
        _id: objectId(req.body.spid),
        spzt: "yxj"
    }, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        if (result.length != 0) {
            console.log("商品以下架")
            //删除数据库
            mongodb_gnj.sc("spgl", "sp", {
                _id: objectId(req.body.spid),
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

    // setTimeout(function () {
    //     res.json("ok");
    // }, 500);
}

module.exports = index_splbscsp;