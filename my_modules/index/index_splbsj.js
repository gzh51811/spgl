var mongodb_gnj = require('../mongodb_gnj');

function index_splbsj(req, res, urls) {
    console.log(req.query.index_spxstj)
    //查询数据库
    mongodb_gnj.splbcx(req.query.index_spxstj, function (err, result) {
        if (err) {
            console.log('Error:' + err);
            return;
        }

        console.log(result)
        res.json(JSON.stringify(result));
    });
}

module.exports = index_splbsj;