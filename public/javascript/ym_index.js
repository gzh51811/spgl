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


////////////////////// 发布商品弹出框控制


// 上传主图预览
$("#indextjsp_an").on("change", function (e) {
    // 关闭提示框
    $("#indextjsp_ts").css("display", "none");

    //获取file实例
    var file = document.getElementById("indextjsp_an")
    //渲染选中的文件
    console.log(file.files)
    //是否选图片
    if (file.files.length != 0) {
        //限制图片属性
        // 获取图片 格式信息
        var gs = file.files[0].name;
        var hzcx = gs.lastIndexOf(".");
        var wjgs = gs.slice(hzcx + 1);
        // 获取图片大小
        var ds = file.files[0].size;

        console.log(wjgs + " " + ds)
        if (wjgs == "jpg" && ds < 510000) {
            //图片属性大小验证通过 
            $(".indextjsp_zt").attr("src", window.URL.createObjectURL(file.files[0]))
        } else {
            $("#indextjsp_ts").text("图片格式为jpg，大小500kb以内。").css("display", "block")
            $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
        }
    } else {
        $(".indextjsp_zt").attr("src", "spt/a1.jpg")
    }
});

// 标题输入控制
$("#indextjsp_mc").on("keydown", function (e) {
    setTimeout(function () {
        //读取 以输入字符数量
        var srz = $("#indextjsp_mc").val();
        // console.log(srz)
        //检测字符长度
        var zfcd = srz.length

        //检测长度
        if (zfcd <= 20) {
            //写入提示
            $("#indextjsp_mc_ts").text("输入字数 " + zfcd + "/20")
        } else {
            $("#indextjsp_mc").val($("#indextjsp_mc").val().slice(0, 20))
        }

    }, 10);

});

//确定 发布商品
$("#indextjsp_qdtj").click(function (e) {
    // 检查是否为空再，发送ajax请求

    if ($("#indextjsp input").val() != "") {
        $.post("/ycsj", {
                sjnr: "全部商品",
                qqsj: "fbsp",
                // yhm: $.trim($("#usertjyh_yhm").val()),
                // yx: $.trim($("#usertjyh_yx").val()),
                // mm: $.trim($("#usertjyh_mm").val()),
                // qx: $.trim($("#usertjyh_qx").val())
            },
            function (data, status) {
                console.log(data)
                if (data == "ok") {
                    console.log("商品发布成功")
                    $("#indextjsp_ts").text("商品发布成功").css("display", "block")
                    $("#indextjsp_ts").removeClass().addClass("alert alert-success");

                    // 关闭模态框
                    $('#indextjsp').modal("toggle")

                } else {
                    $("#indextjsp_ts").text("请按照规范正确完整填写。").css("display", "block")
                    $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
                }
            });

    } else {
        $("#indextjsp_ts").css("display", "block")
        $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
        $("#indextjsp_ts").text("请全部添加/填写。")
    }
})


// 表单聚焦事件
$("#indextjsp input").focus(function () {
    $("#indextjsp_ts").css("display", "none");
});


// 取消修改用户名
$('#indextjsp').on('hidden.bs.modal', function (e) {
    console.log("关闭添加用户模态框，清空模态框内容");
    // 清空输入表单内容
    $("#indextjsp input").val("");
    // 关闭提示框
    $("#indextjsp_ts").css("display", "none");
    //清除文件选择
    var file = document.getElementById("indextjsp_an")
    file.value = '';
    $(".indextjsp_zt").attr("src", "spt/a1.jpg")
})

//////////////////////



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

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

window.randomScalingFactor = function () {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};




var pieConfig = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                400, 300, 100, 800, 600
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.yellow,
                window.chartColors.green,
                window.chartColors.blue,
            ],
            label: 'Dataset 1'
        }],
        labels: [
            "交易完成",
            "交易关闭",
            "已发货",
            "待发货",
            "待付款"
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: '订单信息',
            position: 'top'
        }
    }
};

var pieCtx = document.getElementById("chartjs-pie-chart").getContext("2d");
window.myPie = new Chart(pieCtx, pieConfig);