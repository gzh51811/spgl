// 点击列表选中 拿取当前点击的列表 li节点
$("#index_sjlb").click(function (e) {

    if (e.target.tagName == "A") {
        var lbjd;
        lbjd = $(e.target).closest("li");
        index_sjlbqh(lbjd)
    }

});

// 点击退出当前账号
$("#index_tc").click(function (e) {
    //向服务器发送退出请求
    $.post("/login/tc", function (data, status) {
        // console.log(data)
        setTimeout(function () {
            $(location).attr('href', '/');
        }, 100);
    });
});



// 左侧列表样式控制 传入需要选中的li标签 向选中标签添加选中类名 更改url地址不刷新页面
function index_sjlbqh(sj) {

    //清空列表选中样式
    $("#index_sjlb li").removeClass("active");
    // 向选中标签添加样式
    sj.addClass("active")
    //渲染右侧内容
    index_sjxr();
}

// 右侧页面内容显示控制 自动检测列表选中状态
function index_sjxr() {
    //需要渲染的请求参数
    var sx;

    $.each($("#index_sjlb li"), function (i, n) {
        if ($(n).attr("class") == "active") {
            sx = $.trim($(n).children().text());
        }
    });

    console.log(sx)

    // 隐藏所有内容
    $("#page-wrapper>div").css("display", "none");

    if (sx == "数据概览") {
        $("#index_sjgl").css("display", "block");
    } else if (sx == "全部商品") {
        $("#index_qbsp").css("display", "block");
    } else if (sx == "全部订单") {
        $("#index_qbdd").css("display", "block");
    }
}

