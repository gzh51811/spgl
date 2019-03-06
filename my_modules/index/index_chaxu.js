var mongodb_gnj = require('../mongodb_gnj');
var ObjectID = require("mongodb").ObjectID
function index_chaxu(req, res) {
    console.log(req.body.sjnr)
    var sendMsg = {
        status: "ok",
        data: [],
        data_sp: [],
    }
    setTimeout(function () {
        console.log(sendMsg)
        res.send(sendMsg)
    }, 1000)
    //根据前端传来的参数进行查询并返回结果
    mongodb_gnj.cx("spgl", "dd", {
        state: req.body.sjnr,
    }, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return
        };
        if (result.length != 0) {
            // console.log(result)//获得dd查询结果
            sendMsg.data = result;//赋值
            // console.log(orderMsg)
            result.forEach(async (item, index) => {
                // console.log(item, index)
                var goodrArr = [];
                //遍历订单拿到里面的ddxx
                goodrArr = item.ddxx;
                // console.log(goodrArr)
                //遍历订单内的商品，进行查询
                goodrArr.forEach(function (item, index) {
                    // console.log(item,index,item.spid)
                    // var spArr = item;
                    // console.log(spArr, spArr.spid)
                    mongodb_gnj.cx("spgl", "sp", {
                        "_id": new ObjectID(item.spid)
                    }, function (err, effect) {
                        if (err) {
                            console.log('Error:' + err);
                            return
                        }
                        if (effect.length != 0) {
                            // console.log(effect)
                            sendMsg.data_sp.push(effect);
                            // console.log("返回最终结果")
                        }
                    })
                })
            })
            //如果不存在返回no
        }
    })
}
module.exports = index_chaxu;