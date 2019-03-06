var mongodb_gnj = require('../mongodb_gnj');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

function index_glsj(req, res, urls) {
    //返回数据
    var fhsj = {
        pieConfigs: [0, 0],
        pieConfig: [0, 0, 0, 0, 0]
    }

    // 商品数据查询
    mongodb_gnj.cx("spgl", "sp", {
        spzt: "csz"
    }, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }
        fhsj.pieConfigs[0] = result.length + fhsj.pieConfigs[0]
        mongodb_gnj.cx("spgl", "sp", {
            spzt: "yxj"
        }, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            fhsj.pieConfigs[1] = result.length + fhsj.pieConfigs[1]

            // 订单数据查询
            mongodb_gnj.cx("spgl", "dd", {}, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    return;
                }
                console.log(result);

                result.forEach(function (elem) {
                    if (elem.state == "交易完成") {
                        fhsj.pieConfig[0] = fhsj.pieConfig[0] + 1
                    } else if (elem.state == "交易关闭") {
                        fhsj.pieConfig[1] = fhsj.pieConfig[1] + 1
                    } else if (elem.state == "已发货") {
                        fhsj.pieConfig[2] = fhsj.pieConfig[2] + 1
                    } else if (elem.state == "待发货") {
                        fhsj.pieConfig[3] = fhsj.pieConfig[3] + 1
                    } else if (elem.state == "待付款") {
                        fhsj.pieConfig[4] = fhsj.pieConfig[4] + 1
                    }
                });
                res.json(fhsj);
            });

        });

    });







    // res.json(fhsj);
}

module.exports = index_glsj;