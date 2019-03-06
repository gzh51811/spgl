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


//点击删除商品事件
$("#index_spsp").click(function () {
    $.post("/ycsj", {
            sjnr: "全部商品",
            qqsj: "scsp",
            spid: $("#indextjsp").attr("xgspid")
        },
        function (data, status) {
            if (data == "ok") {

                $("#indextjsp_ts").text("商品删除成功").css("display", "block")
                $("#indextjsp_ts").removeClass().addClass("alert alert-success");
                // 关闭模态框
                $('#indextjsp').modal("toggle")
                index_splb(index_spxstj);
            } else {
                $("#indextjsp_ts").text("请将商品下架再删除。").css("display", "block")
                $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
            }

        });
})


////////////////////// 发布商品弹出框控制


//点击商品列表编辑列表
$("#index_splbsj").click(function (e) {
    if (e.target.tagName == "BUTTON" && $(e.target).text() == "编辑商品") {
        //像模态框写入相关数据
        $("#indextjsp").attr("xgspid", $(e.target).closest("tr").attr("spid"))
        //主图
        $(".indextjsp_zt").attr("src", $($($(e.target).closest("tr").children()[1]).children()[0]).attr("src"))
        //商品名称
        $("#indextjsp_mc").val($($(e.target).closest("tr").children()[2]).text())
        //商品名称输入计数
        $("#indextjsp_mc_ts").text("输入字数 " + $($(e.target).closest("tr").children()[2]).text().length + "/20")
        //商品价格
        $("#indextjsp_jg").val($($($(e.target).closest("tr").children()[3]).children()[1]).text())
        //商品库存
        $("#indextjsp_kc").val($($(e.target).closest("tr").children()[4]).text())
        //是否上架
        if ($($($(e.target).closest("tr").children()[7]).children()[1]).text() == "下架") {
            // 当前状态为上架
            $("#indextjsp_sj").val("上架")
        } else {
            $("#indextjsp_sj").val("不上架")
        }
        // 开启模态框
        $('#indextjsp').modal("toggle");
    }
})




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
    if ($("#indextjsp_mc,#indextjsp_jg,#indextjsp_kc,#indextjsp_sj").val() != "") {
        var file = document.getElementById("indextjsp_an")
        var zts;
        //如果是发布新商品
        if ($("#indextjsp_an").val() != "") {
            //如果选择了文件
            zts = ""
        } else {
            zts = $(".indextjsp_zt").attr("src");
        }

        let formData = new FormData();
        formData.append('zt', file.files[0]);
        formData.append("CustomField", "This is some extra data");
        formData.append('spmc', $.trim($("#indextjsp_mc").val()));
        formData.append('jg', $.trim($("#indextjsp_jg").val()));
        formData.append('kc', $.trim($("#indextjsp_kc").val()));
        formData.append('sj', $.trim($("#indextjsp_sj").val()));
        formData.append('xgspid', $("#indextjsp").attr("xgspid"))
        formData.append('ztlj', zts)
        $.ajax({
            url: '/ycsj/tjsp',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data)
                if (data == "ok") {
                    console.log("商品发布成功")
                    $("#indextjsp_ts").text("商品发布成功").css("display", "block")
                    $("#indextjsp_ts").removeClass().addClass("alert alert-success");
                    index_splb(index_spxstj)
                    // 关闭模态框
                    $('#indextjsp').modal("toggle")

                } else {
                    $("#indextjsp_ts").text("请按照规范正确完整填写。").css("display", "block")
                    $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
                }
            },
            error: function () {
                $("#indextjsp_ts").text("与服务器通信发生错误.").css("display", "block")
                $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
            }
        });



        // $.post("/ycsj", {
        //         sjnr: "全部商品",
        //         qqsj: "fbsp",
        //         data: formData,
        //         spmc: $.trim($("#indextjsp_mc").val()),
        //         jg: $.trim($("#indextjsp_jg").val()),
        //         kc: $.trim($("#indextjsp_kc").val()),
        //         sj: $.trim($("#indextjsp_sj").val()),
        //         cache: false,
        //         contentType: false,
        //         processData: false
        //     },
        //     function (data, status) {
        //         console.log(data)
        //         if (data == "ok") {
        //             console.log("商品发布成功")
        //             $("#indextjsp_ts").text("商品发布成功").css("display", "block")
        //             $("#indextjsp_ts").removeClass().addClass("alert alert-success");

        //             // 关闭模态框
        //             $('#indextjsp').modal("toggle")

        //         } else {
        //             $("#indextjsp_ts").text("请按照规范正确完整填写。").css("display", "block")
        //             $("#indextjsp_ts").removeClass().addClass("alert alert-warning");
        //         }
        //     });

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
    $("#indextjsp").attr("xgspid", "")
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


////////////////////// 商品显示控制

// 条件 spzt/商品状态:all/全部商品，csz/出售中，yxj/已下架  
// 字段 sszd:默认为空  
// 排序 px:jg/商品价格排序，kc/库存排序，xl/销量排序，sj/发布时间排序 默认为空
// 排序方式 pxfs:0/不排序，1升序 -1降序
// 当前页码 dqym:数字
// 总页数 zys

// 商品显示条件相关数据
var index_spxstj = {
    spzt: "all",
    sszd: "",
    px: "",
    pxfs: "0",
    dqym: "1",
    zys: "0"
}


// 重置刷新
$("#index_splbczsx").click(function () {
    console.log("刷新")
    index_spxstj = {
        spzt: "all",
        sszd: "",
        px: "",
        pxfs: "0",
        dqym: "1"
    }
    $(".index_lbdhl_px span:nth-last-child(1)").text("▼")
    $(".index_lbdhl_px").removeClass("index_lbdhl_px_xz")
    $("#index_spzt .btn-default").removeClass("active")
    $("#index_spzt label:nth-child(1)").addClass("active")

    $("#index_spssl").val("");
    // 请求数据
    index_splb(index_spxstj);
})


// 搜索字段控制
$("#index_spssl").on("keydown", function (e) {
    setTimeout(function () {
        //读取 以输入字符数量
        var srz = $("#index_spssl").val();

        var zfcd = srz.length
        index_spxstj.sszd = srz
        //检测长度
        if (zfcd > 20) {
            $("#index_spssl").val($("#index_spssl").val().slice(0, 20))
        }

    }, 10);

});

$("#index_splbss").on("click", function () {
    index_splb(index_spxstj);
})


// 商品状态控制
$("#index_spzt label").on("click", function (e) {
    // 修改数据状态
    index_spxstj.spzt = $(e.target).attr("spzt")
    //修改分页
    index_spxstj.dqym = "1"
    index_splb(index_spxstj);
    // console.log(index_spxstj)
})


//点击导航名称 切换排序
$(".index_lbdhl_px span:first-child").on("click", function (e) {
    // console.log(index_spxstj)
    if ($(e.target).closest("th").attr("pxzd") == index_spxstj.px) {

        // 清空所有选中样式
        index_spxstj.px = ""
        index_spxstj.pxfs = "0"
        $(".index_lbdhl_px span:nth-last-child(1)").text("▼")
        $(".index_lbdhl_px").removeClass("index_lbdhl_px_xz")

    } else {

        // 清空所有选中样式
        index_spxstj.px = ""
        index_spxstj.pxfs = "0"
        $(".index_lbdhl_px span:nth-last-child(1)").text("▼")
        $(".index_lbdhl_px").removeClass("index_lbdhl_px_xz")

        // 加入数据
        //将点击的条件添加到数据中选中
        index_spxstj.pxfs = "-1"
        index_spxstj.px = $(e.target).closest("th").attr("pxzd");
        // 像接结点添加样式
        $($(e.target).closest("th")).addClass("index_lbdhl_px_xz")
    }

    index_splb(index_spxstj);
})

// 点击导航箭头 改变排序方式

$(".index_lbdhl_px span:nth-last-child(1)").on("click", function (e) {
    // console.log(index_spxstj)
    if ($(e.target).closest("th").attr("pxzd") == index_spxstj.px) {
        // 改变排序方式
        if (index_spxstj.pxfs == "-1") {
            index_spxstj.pxfs = "1";
            $(e.target).text("▲")
        } else {
            index_spxstj.pxfs = "-1"
            $(e.target).text("▼")
        }

    } else {
        // 清空所有选中样式
        index_spxstj.px = ""
        index_spxstj.pxfs = "0"
        $(".index_lbdhl_px span:nth-last-child(1)").text("▼")

        $(".index_lbdhl_px").removeClass("index_lbdhl_px_xz")

        // 加入数据
        //将点击的条件添加到数据中选中
        index_spxstj.pxfs = "-1"
        index_spxstj.px = $(e.target).closest("th").attr("pxzd");
        // 像接结点添加样式
        $($(e.target).closest("th")).addClass("index_lbdhl_px_xz")
    }
    index_splb(index_spxstj);
})


// 分页标签点击  修改数据中的页码

$("#index_fybq").on("click", function (e) {
    console.log("点击")

    // 点击为页码
    if ($(e.target).attr("bqlx") == "ym") {
        index_spxstj.dqym = $.trim($(e.target).text());
        // 请求数据
        index_splb(index_spxstj);

    } else if ($(e.target).attr("bqlx") == "qf" && index_spxstj.dqym != 1) {

        index_spxstj.dqym = index_spxstj.dqym * 1 - 1;
        // 请求数据
        index_splb(index_spxstj);
    } else if ($(e.target).attr("bqlx") == "hf" && index_spxstj.dqym != index_spxstj.zys) {

        index_spxstj.dqym = index_spxstj.dqym * 1 + 1;
        // 请求数据
        index_splb(index_spxstj);
    }


})

// 分页标签点击 翻页
// $(".index_kxym_qf a").on("click", function (e) {
//     if (index_spxstj.dqym != 1) {
//         index_spxstj.dqym = index_spxstj.dqym * 1 - 1;
//         index_splb(index_spxstj);
//     }
// })
// $(".index_kxym_hf a").on("click", function (e) {
//     if (index_spxstj.dqym != $("#index_fybq li:nth-child(8) a").text() * 1) {
//         index_spxstj.dqym = index_spxstj.dqym * 1 + 1
//         index_splb(index_spxstj);

//     }
// })



//////////////////////



// 商品列表数据请求渲染 
//传入 条件 spzt/商品状态:all/全部商品，csz/出售中，yxj/已下架  字段 sszd:默认为空  
//排序 px:jg/商品价格排序，kc/库存排序，xl/销量排序，sj/发布时间排序 默认为空
//排序方式 pxfs:0/从大到小，1从小到大
function index_splb(index_spxstj) {
    console.log("加载商品列表数据")

    // 清空列表
    $("#index_splbsj").html("");
    // 显示加动画

    $(".index_login").css("display", "block")

    // 隐藏分页标签
    $("#index_fybq").css("display", "none")

    // 取消全选
    $("#index_splb_dx").prop("checked", false);
    $.get("/ycsj", {
            sjnr: "全部商品",
            qqsj: "splb",
            index_spxstj
        },
        function (data) {
            console.log(JSON.parse(data))
            var data = JSON.parse(data);
            //渲染列表
            $.each(data.lbsj, function (i, n) {
                // console.log(n)
                $("#index_splbsj").append(`
                <tr spid="${n._id}" spzt="${n.spzt}">
                    <td>
                        <label style="margin:0px;">
                        <input type="checkbox" style="margin:0px;">
                        </label>
                    </td>
                    <td>
                        <img src="${n.ztlj}" alt="">
                    </td>
                    <td class="index_splb_bt">${n.spbt}</td>
                    <td><span>￥</span><span>${n.spjg}</span></td>
                    <td>${n.spkc}</td>
                    <td>0</td>
                    <td>${timetrans(n.fbsj)}</td>
                    <td>
                        <button type="button" class="btn btn-default btn-xs userbjyh_tc">编辑商品</button>
                        <button type="button" class="btn btn-default btn-xs userbjyh_tc">${index_sxjkz(n.spzt)}</button>
                    </td>
                </tr>
            `)
            });

            //关闭加载动画
            $(".index_login").css("display", "none")



            // 修改分页标签

            // 分页显示控制
            // 页面总数 小于6页 大于6页
            var ymzs = Math.ceil(data.spzl / 10);
            // 当前页面
            var dqym = index_spxstj.dqym;

            index_spxstj.zys = ymzs;
            // 向前翻页
            $("#index_fybq ul").html("").append(`
            <li class="index_kxym_qf">
                <a href="#" aria-label="Previous" bqlx="qf">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            `)


            if (ymzs <= 6) {
                // 如果页面数量小于6页
                for (let i = 0; i < ymzs; i++) {
                    // 写入页码
                    $("#index_fybq ul").append(`
                    <li class="index_kxym index_kxym_bh"><a href="#" bqlx="ym">${i+1}</a></li>
                `)
                }
            } else if (ymzs > 6) {
                // 如果页面数量大于6页
                if (dqym < 6) {
                    for (let i = 1; i < 6; i++) {
                        // 写入页码
                        $("#index_fybq ul").append(`
                        <li class="index_kxym index_kxym_bh"><a href="#" bqlx="ym">${i}</a></li>
                    `)
                    }

                    $("#index_fybq ul").append(`
                    <li class="disabled"><a href="#">...</a></li>
                    <li class="index_kxym"><a href="#"  bqlx="ym">${ymzs}</a></li>
                `)
                } else if (ymzs - dqym < 5) {
                    $("#index_fybq ul").append(`
                    <li class="index_kxym index_kxym_bh"><a href="#" bqlx="ym">1</a></li>
                    <li class="disabled"><a href="#">...</a></li>
                `)

                    for (let i = ymzs - 4; i < ymzs; i++) {
                        // 写入页码
                        $("#index_fybq ul").append(`
                        <li class="index_kxym index_kxym_bh"><a href="#" bqlx="ym">${i}</a></li>
                    `)
                    }

                    $("#index_fybq ul").append(`
                    <li class="index_kxym"><a href="#"  bqlx="ym">${ymzs}</a></li>
                `)

                } else {
                    var sss = dqym - 5;

                    for (let i = 1; i < 6; i++) {
                        // 写入页码
                        $("#index_fybq ul").append(`
                        <li class="index_kxym index_kxym_bh"><a href="#" bqlx="ym">${sss+i}</a></li>
                    `)
                    }

                    $("#index_fybq ul").append(`
                    <li class="disabled"><a href="#">...</a></li>
                    <li class="index_kxym"><a href="#"  bqlx="ym">${ymzs}</a></li>
                `)



                }

            }

            // 向前翻页
            $("#index_fybq ul").append(`
            <li class="index_kxym_hf">
                <a href="#" aria-label="Next" bqlx="hf">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            `)

            // 显示分页标签
            $("#index_fybq").css("display", "block")

            // 选中样式修改
            index_ymbq()

        });

}


// 多选控制

//全选按钮点击
$("#index_splb_dx").click(function (e) {
    var bol = $('#index_splb_dx').is(':checked');
    console.log(bol)
    if (bol) {
        $('#index_splbsj input').prop("checked", true);
    } else {
        $('#index_splbsj input').prop("checked", false);
    }
})
//列表点击
$("#index_splbsj").click(function (e) {
    if (e.target.tagName == "INPUT") {

        // 遍历检查
        var aa = true;
        $.each($('#index_splbsj input'), function (i, n) {
            if (!$(n).is(':checked')) {
                aa = false
            }
        });

        if (aa) {
            $("#index_splb_dx").prop("checked", true);
        } else {
            $("#index_splb_dx").prop("checked", false);
        }
        console.log(aa)
    }

})

// 导航上架商品点击
$("#index_splbdxsj").click(function () {
    index_spsj(index_splbxzsp())
})

// 单点上架
$("#index_splbsj").click(function (e) {
    if (e.target.tagName == "BUTTON" && $(e.target).text() == "上架") {
        index_spsj([$(e.target).closest("tr").attr("spid")])
    }
})

// 单点下架
$("#index_splbsj").click(function (e) {
    if (e.target.tagName == "BUTTON" && $(e.target).text() == "下架") {
        $(e.target).closest("tr").attr("spid")
        $.post("/ycsj", {
                sjnr: "全部商品",
                qqsj: "xjsp",
                spid: $(e.target).closest("tr").attr("spid")
            },
            function (data, status) {
                console.log(data)
                index_splb(index_spxstj);
            });
    }
})






// 获取已选中商品 将下架商品id数组返回
function index_splbxzsp() {
    //开始检测已选中商品
    console.log("开始检测已选中商品")
    var xzsp = []
    $.each($('#index_splbsj input'), function (i, n) {
        if ($(n).is(':checked') && $(n).closest("tr").attr("spzt") == "yxj") {
            console.log(n)
            xzsp.push($(n).closest("tr").attr("spid"))
        }
    });
    console.log(xzsp)
    return xzsp
}

// 上架商品函数 传入商品数组
function index_spsj(daat) {
    console.log("收到上架商品数组")

    //发送上架请求
    if (daat.length != 0) {

        $.post("/ycsj", {
                sjnr: "全部商品",
                qqsj: "sjsp",
                sjsj: daat
            },
            function (data, status) {
                console.log(data)
                index_splb(index_spxstj);
            });
    }

}







// 上下架 判断
function index_sxjkz(daa) {
    if (daa == "yxj") {
        return "上架"
    } else {
        return "下架"
    }
}

// 页码标签样式
function index_ymbq() {
    //判断当前页码为相应 标签添加样式
    $(".index_kxym").removeClass("active");
    $.each($(".index_kxym"), function (i, n) {
        // console.log($(n).children(0).text())
        // console.log(index_spxstj.dqym)
        if ($(n).children(0).text() == index_spxstj.dqym) {

            $(n).addClass("active")
        }
    });
}


function timetrans(dates) {
    var date = new Date(dates * 1); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}

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
        index_splb(index_spxstj)
    } else if (sx == "全部订单") {
        $("#index_qbdd").css("display", "block");
    }
}


//全部订单代码==点击按钮获取内容
$("#myTab").on("click", "li", function (e) {
    $('.tbody').html("");
    let liCotent = $(this).text();
    $.post("/qbdd", {
        sjnr: liCotent,
    },
        function (data) {
            if (data.status == "ok") {
                // console.log(data)
                // console.log(data.data)
                // console.log(data.data_sp)
                //订单
                var order = new Array();
                order = data.data;
                // console.log(order)
                //订单内商品信息
                var goods = data.data_sp;
                // console.log(goods)
                //遍历订单
                $.map(order, function (item, index) {
                    // console.log(item)
                    //转换时间
                    var date = new Date(item.time * 1000);//如果date为13位不需要乘1000
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                    var time = Y + M + D + h + m + s;
                    console.log(time)
                    //订单id
                    // var id=item._id
                    // console.log(id)
                    // //商品数量
                    // var DDXX = item.ddxx;
                    // $.map(DDXX, function (item, index) {
                    //     var goodNum = item.gmsl
                    //     // console.log(goodNum);
                    //     //遍历订单内商品
                    //     $.map(goods, function (item, idx) {
                    //         console.log(goods)
                    //         $(".tbody").append(`
                    //         <tr>
                    //             <td class="ddId">${id}</td>
                    //             <td class="spId">${goods[index]._id}</td>
                    //             <td><img src="${goods[index].ztlj}"/></td>
                    //             <td>${goods[index].spbt}</td>
                    //             <td>${goodNum}</td>
                    //             <td>${order[index].state}</td>
                    //             <td>
                    //                 ${time}
                    //             </td>
                    //         </tr>
                    //     `)
                    //     })
                    // })

                })
            } else {
                $(".tbody").append(
                    `
                    <h1>木有数据哦</h1>
                    `
                )
            }
        })
})



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
                0, 0, 0, 0, 0
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

var pieConfigs = {
    type: 'pie',
    data: {
        datasets: [{
            data: [
                0, 0
            ],
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange
            ],
            label: 'Dataset 1'
        }],
        labels: [
            "出售中",
            "已下架"
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: '商品信息',
            position: 'top'
        }
    }
};

// 订单查询
function index_sjyl() {
    console.log("收到上架商品数组")

    //预览数据请求
    $.get("/ycsj", {
            sjnr: "数据概览",
            qqsj: "sjgl"
        },
        function (data, status) {
            //改写图标数据

            var data = data;


            pieConfigs.data.datasets[0].data = data.pieConfigs
            pieConfig.data.datasets[0].data = data.pieConfig

            //生成表单实例
            var pieCtx = document.getElementById("chartjs-pie-chart").getContext("2d");
            var pieCtxs = document.getElementById("chartjs-pie-chart2").getContext("2d");
            window.myPie = new Chart(pieCtx, pieConfig);
            window.myPie = new Chart(pieCtxs, pieConfigs);
        });
}
index_sjyl()
