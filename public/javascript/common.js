//向cookie写入数据
//Cooke.ccxr('cname', JSON.stringify(cvalue), 1, '/');

//向cookie读取数据
//var a = JSON.parse(Cooke.ccdq('cname'));

//删除cookie文件
//Cooke.ccsc("cname")
//封装cooke
var Cooke = {
    //写入cookie文件 传入参数为名称，值，保存时间(以天数为单位)，读取域
    ccxr: function (cname, cvalue, ctime, cy) {
        //生成到期时间
        //获取当前时间
        var ds = new Date();
        //计算到期时间
        ds.setTime(ds.getTime() + (ctime * 1000 * 60 * 60 * 24));
        //合成时间写入字符
        var expires = "expires=" + ds.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + '; path=' + cy;
        return '写入成功';
    },
    //删除cookie文件
    ccsc: function (cname) {
        document.cookie = cname + "=" + ";" + 'expires=Thu, 01 Jan 1970 00:00:00 GMT'+"; path=/";
        return '删除成功';
    },
    //读取cookie文件
    ccdq: function (cname) {
        var names = cname + '=';
        var csz = document.cookie.split(';');
        for (var x in csz) {
            // console.log(csz[x])
            if (csz[x].trim().indexOf(names) == 0) {
                //去除当前数组前后空格
                var dqk = csz[x].trim();
                return dqk.substring(names.length, dqk.length);
            }
        }
        return "non"
    }
}