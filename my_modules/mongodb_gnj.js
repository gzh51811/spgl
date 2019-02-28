var express = require('express');
// 引入 events 模块
var events = require('events');
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
    MongoClient.connect(url, function (err, db) {
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
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
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

module.exports = {
    tj,
    sc,
    xg,
    cx
};