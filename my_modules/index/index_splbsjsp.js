var mongodb_gnj = require('../mongodb_gnj');
var objectId = require('mongodb').ObjectId;

function index_splbsjsp(req, res, urls) {
    console.log(req.body.sjsj)
    if (req.body.sjsj.length != 0) {
        console.log("数据不为空，开始修改数据库")
        req.body.sjsj.forEach(function (elem) {

            mongodb_gnj.xg("spgl", "sp", {
                _id: objectId(elem)
            }, {
                spzt: "csz"
            }, function (err, result) {
                if (err) {
                    console.log('Error:' + err);
                    return;
                }
            });
        });

        setTimeout(function () {
            res.json("ok");
        }, 500);
    }
}

module.exports = index_splbsjsp;