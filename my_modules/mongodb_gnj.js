var express = require('express');

var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://wutong:wutong19991213@47.98.205.116:27017/";
// mongodb://ogolgh: lgonnat042@47.98.205.116:27017

// MongoClient.connect('mongodb://ogolgh:lgonnat042@47.98.205.116:27017/spgl',{ useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
// })

//添加数据 传入数据库名字 dbnames，传入集合名字 jhnames, 传入格式为数组的数据条 objs
function tj(dbnames, jhnames, objs, fs) {
    console.log("开始执行添加数据")
    //向mg添加数据
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbnames);
        dbo.collection(jhnames).insert(objs, function (err, result) {
            if (err) {
                fs(err, result);
                return;
            }
            fs(err, result);
            db.close();
        });
    });
}
//删除数据 传入数据库名字 dbnames，传入集合名字 jhnames, 传入数据条 objs 一个键值
function sc(dbnames, jhnames, objs, fs) {
    console.log("开始执行删除数据")
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbnames);
        dbo.collection(jhnames).deleteOne(objs, function (err, obj) {
            if (err) {
                fs(err, obj);
                return;
            }
            fs(err, obj);
            db.close();
        });
    });
}
//修改数据 传入数据库名字 dbnames，传入集合名字 jhnames, 传入数据条 objs ,传入新的数据 nobjs
function xg(dbnames, jhnames, objs, nobjs, fs) {
    console.log("开始执行修改数据")
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbnames);
        var updateStr = {
            $set: nobjs
        };
        dbo.collection(jhnames).updateOne(objs, updateStr, function (err, res) {
            if (err) {
                fs(err, res);
                return;
            }
            fs(err, res);
            db.close();
        });
    });
}
//查询数据 传入数据库名字 dbnames，传入集合名字 jhnames, 传入数据条 objs 一个键值
function cx(dbnames, jhnames, objs, fs) {
    console.log("开始执行查询数据")
    console.log(objs)
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        console.log("链接成功")
        var dbo = db.db(dbnames);
        dbo.collection(jhnames).find(objs).toArray(function (err, result) {
            if (err) {
                fs(err, result);
                return;
            }
            fs(err, result);
            db.close();
        });
    });
}


//商品列表查询
function splbcx(objs, fs) {

    console.log("开始执行查询数据")
    console.log(objs)

    //无排序，所有状态，无搜索条件

    console.log("无排序，所有状态，无搜索条件");

    var ssf = {}
    // spzt: objs.spzt

    // 查询商品 状态判断
    if (objs.spzt == "csz") {
        ssf.spzt = "csz"
    } else if (objs.spzt == "yxj") {
        ssf.spzt = "yxj"
    }

    // 查询商品 搜索条件判断
    if (objs.sszd != "") {
        ssf.spbt = {
            $regex: objs.sszd
        }
    }

    //排序判断
    // 排序 px:jg/商品价格排序，kc/库存排序，xl/销量排序，sj/发布时间排序 默认为空
    // 排序方式 pxfs:0/不排序，1升序 -1降序
    var pxs = {}
    if (objs.px != "") {
        // pxs.objs.px = objs.pxfs * 1
        if (objs.px == "spjg") {
            pxs = {
                'spjg': objs.pxfs * 1
            }
        } else if (objs.px == "spkc") {
            pxs = {
                'spkc': objs.pxfs * 1
            }
        } else if (objs.px == "spxl") {
            pxs = {
                'spxl': objs.pxfs * 1
            }
        } else if (objs.px == "fbsj") {
            pxs = {
                'fbsj': objs.pxfs * 1
            }
        }
    }
    console.log(pxs)

    // 返回十条数据，返回当前条件所有数据数量
    //读取开始位置
    var skip_dqks = objs.dqym * 10 - 10;

    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        console.log("链接成功")

        // 返回前端数据
        var datas = {
            spzl: 0,
            lbsj: []
        }

        var dbo = db.db("spgl");

        // 获取当前条件 获取总数
        dbo.collection("sp").find(ssf).toArray(function (err, result) {
            if (err) {
                fs(err, result);
                return;
            }
            //件查询到的总数加入到数据中
            datas.spzl = result.length;
            event.emit('sjhq');
        });

        event.on('sjhq', function () {
            // 获取数据
            dbo.collection("sp").find(ssf).collation({
                "locale": "zh",
                numericOrdering: true
            }).sort(pxs).limit(10).skip(skip_dqks).toArray(function (err, result) {
                if (err) {
                    fs(err, result);
                    return;
                }
                datas.lbsj = result
                fs(err, datas);
                db.close();
            });
        });

    });

}





module.exports = {
    tj,
    sc,
    xg,
    cx,
    splbcx
};