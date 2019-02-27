const { MongoClient, ObjectId } = require('mongodb')
const url = 'mongodb://ogolgh: lgonnat042@47.98.205.116:27017';
const dbName = 'spgl';

//链接封装
let connect = () => {
    return new Promise((res, rej) => {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                rej(err);
            } else {
                const db = client.db(dbName);
                res({
                    db,
                    client,
                })
            }
        })
    })
}

//查询封装
let find = (col, obj) => {
    return new Promise(async (res, rej) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.find({
            ...obj
        }).toArray(function (err, result) {
            if (err) {
                rej(err);
            } else {
                res(result);
                client.close();
            }
        })
    })
}

//增加封装
let add = (col, obj) => {
    return new Promise(async (res, rej) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.insertMany(obj, (err, result) => {
            if (err) {
                rej(err);
            } else {
                res(result);
                client.close();
            }
        })
    })
}
add('user',{
    name:'123',
    passworld:'123456'
})

//删除封装
let del = (col, obj) => {
    return new Promise(async (res, rej) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.deleteOne({
            ...obj
        }), (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result)
                client.close();
            }
        }
    })
}

//修改封装
let change = (col, obj1, obj2) => {
    return new Promise(async (res, rej) => {
        let {
            db,
            client
        } = await connect();
        const collection = db.collection(col);
        collection.updateMany({
            ...obj1
        }, {
                $set: {
                    ...obj2
                }
            }, (err, result) => {
                if (err) {
                    rej(err);
                } else {
                    res(result);
                    client.close();
                }
            }
        )
    })
}
module.exports = {
    find,
    add,
    del,
    change
}