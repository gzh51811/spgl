var mongodb_gnj = require('../mongodb_gnj');
var objectId = require('mongodb').ObjectId;

function index_splbsjsp(req, res, urls) {
    console.log("下架商品，开始修改数据库")

        mongodb_gnj.xg("spgl", "sp", {
            _id: objectId(req.body.spid)
        }, {
            spzt: "yxj"
        }, function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
        });
    

    setTimeout(function () {
        res.json("ok");
    }, 500);
}

module.exports = index_splbsjsp;