// 点击列表选中 拿取当前点击的列表 li节点
$("#user_sjlb").click(function (e) {

    if (e.target.tagName == "A") {
        var lbjd;
        lbjd = $(e.target).closest("li");
        user_sjlbqh(lbjd)
    }

});

// 点击退出当前账号
$("#user_tc").click(function (e) {
    //向服务器发送退出请求
    $.post("/login/tc", function (data, status) {
        // console.log(data)
        setTimeout(function () {
            window.location.reload();
        }, 100);
    });
});

// sjnr 传入当前右侧界面名称
// qqsj 传入需要请求的事件

// 点击密码显示
$("#usermmsx").click(function () {
    if ($("#usermmsx").hasClass("glyphicon-eye-close")) {
        //更换 按钮样式
        $("#usermmsx").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
        //显示密码
        $(".user_mmyc").css("display", "none")
        $(".user_mmxs").css("display", "inline-block")
    } else {
        //更换 按钮样式
        $("#usermmsx").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
        //显示密码
        $(".user_mmyc").css("display", "inline-block")
        $(".user_mmxs").css("display", "none")
    }
})

// $(document).ready(function () {

// });

//点击刷新用户显示列表请求  点击搜索
$("#user_yhsx,#user_ss").click(function () {
    //检查搜索框内是否有数据
    if ($.trim($("#user_syyhssk").val()) == "") {
        user_syyhsj()
    } else {
        user_syyhsj($.trim($("#user_sslx").text()), $.trim($("#user_syyhssk").val()))
    }
})

//收缩款点击切换搜索条件
$("#user_ssktj a").click(function (e) {
    console.log(e.target.text)
    $("#user_sslx").text(e.target.text)
})





///////////////// 修改用户名处理

// 确认修改用户名
$("#usergryhmxg_qdxg").click(function (e) {
    console.log("点击修改用户名称")
    // 检查是否为空再，发送ajax请求
    if ($("#usergryhmxg_x").val() != "") {
        console.log("发送修改请求" + $("#usergryhmxg_x").val())

        $.post("/user/ycsj", {
                sjnr: "个人信息",
                qqsj: "yhmxg",
                xyhm: $.trim($("#usergryhmxg_x").val())
            },
            function (data, status) {
                console.log(data)
                if (data == "ok") {
                    console.log("用户名修改成功")
                    $("#usergryhmxg_ts").text("用户名修改成功，1秒后刷新页面。").css("display", "block")
                    $("#usergryhmxg_ts").removeClass().addClass("alert alert-success");

                    //一秒后刷新页面
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

                } else {
                    $("#usergryhmxg_ts").text("用户名格式为4-16位字符，且不能包含特殊符号。").css("display", "block")
                    $("#usergryhmxg_ts").removeClass().addClass("alert alert-warning");
                }
            });

    } else {
        $("#usergryhmxg_ts").css("display", "block")
        $("#usergryhmxg_ts").removeClass().addClass("alert alert-warning");
        $("#usergryhmxg_ts").text("请填写新用户名。")
    }
})

// 表单聚焦事件
$("#usergryhmxg_x").focus(function () {
    $("#usergryhmxg_ts").css("display", "none");
});


// 取消修改用户名
$('#usergryhmxg').on('hidden.bs.modal', function (e) {
    console.log("关闭修改用户名模态框，清空模态框内容");
    $("#usergryhmxg_x").val("");
    $("#usergryhmxg_ts").css("display", "none");
})

/////////////////

///////////////// 修改用户名处理

// 确认修改邮箱
$("#usergryxxg_qdxg").click(function (e) {
    console.log("点击修改用户名称")
    // 检查是否为空再，发送ajax请求
    if ($("#usergryxxg_xyx").val() != "" || $("#usergryxxg_xmm").val() != "") {
        console.log("发送修改请求" + $("#usergryhmxg_x").val())

        $.post("/user/ycsj", {
                sjnr: "个人信息",
                qqsj: "yxxg",
                xyx: $.trim($("#usergryxxg_xyx").val()),
                mm: $.trim($("#usergryxxg_mm").val())
            },
            function (data, status) {
                console.log(data)
                if (data == "ok") {
                    console.log("邮箱修改成功")
                    $("#usergryxxg_ts").text("用户名修改成功，1秒后刷新页面。").css("display", "block")
                    $("#usergryxxg_ts").removeClass().addClass("alert alert-success");

                    //一秒后刷新页面
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

                } else {
                    $("#usergryxxg_ts").text("请确定邮箱格式正确，且当前账号密码正确。").css("display", "block")
                    $("#usergryxxg_ts").removeClass().addClass("alert alert-warning");
                }
            });

    } else {
        $("#usergryxxg_ts").css("display", "block")
        $("#usergryxxg_ts").removeClass().addClass("alert alert-warning");
        $("#usergryxxg_ts").text("请填写新邮件，及当前账号密码。")
    }
})


// 表单聚焦事件
$("#usergryxxg_xyx,#usergryxxg_mm").focus(function () {
    console.log("修改邮箱聚焦")
    $("#usergryxxg_ts").css("display", "none");
});


// 取消修改用户名
$('#usergryxxg').on('hidden.bs.modal', function (e) {
    console.log("关闭修改用户名模态框，清空模态框内容");
    $("#usergryxxg_xyx").val("");
    $("#usergryxxg_mm").val("");
    $("#usergryxxg_ts").css("display", "none");
})

/////////////////


//////////////// 修改密码处理

// 确认修改邮箱
$("#usergrmmxg_qdxg").click(function (e) {
    // 检查是否为空再，发送ajax请求
    if ($("#usergrmmxg_ymm").val() != "" || $("#usergrmmxg_xmm").val() != "") {

        $.post("/user/ycsj", {
                sjnr: "个人信息",
                qqsj: "mmxg",
                xmm: $.trim($("#usergrmmxg_xmm").val()),
                ymm: $.trim($("#usergrmmxg_ymm").val())
            },
            function (data, status) {
                console.log(data)
                if (data == "ok") {
                    console.log("邮箱修改成功")
                    $("#usergrmmxg_ts").text("密码修改成功，1秒后刷新页面。").css("display", "block")
                    $("#usergrmmxg_ts").removeClass().addClass("alert alert-success");

                    //一秒后刷新页面
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);

                } else {
                    $("#usergrmmxg_ts").text("请确定原密码正确，且当新密码格式正确，6位以上数字密码组合。").css("display", "block")
                    $("#usergrmmxg_ts").removeClass().addClass("alert alert-warning");
                }
            });

    } else {
        $("#usergrmmxg_ts").css("display", "block")
        $("#usergrmmxg_ts").removeClass().addClass("alert alert-warning");
        $("#usergrmmxg_ts").text("请填写新密码，及当前账号密码。")
    }
})


// 表单聚焦事件
$("#usergrmmxg_ymm,#usergrmmxg_xmm").focus(function () {
    console.log("修改邮箱聚焦")
    $("#usergrmmxg_ts").css("display", "none");
});


// 取消修改用户名
$('#usergrmmxg').on('hidden.bs.modal', function (e) {
    console.log("关闭修改用户名模态框，清空模态框内容");
    $("#usergrmmxg_ymm").val("");
    $("#usergrmmxg_xmm").val("");
    $("#usergrmmxg_ts").css("display", "none");
})

/////////////////


//////////////// 用户弹出框控制

$("#usertjyh_qdtj").click(function (e) {
    // 检查是否为空再，发送ajax请求

    if ($("#usertjyh_yhm,#usertjyh_yx,#usertjyh_mm").val() != "") {
        $.post("/user/ycsj", {
                sjnr: "全部账号",
                qqsj: "xjyh",
                yhm: $.trim($("#usertjyh_yhm").val()),
                yx: $.trim($("#usertjyh_yx").val()),
                mm: $.trim($("#usertjyh_mm").val()),
                qx: $.trim($("#usertjyh_qx").val())
            },
            function (data, status) {
                console.log(data)
                if (data == "ok") {
                    console.log("添加用户成功")
                    $("#usertjyh_ts").text("添加用户成功。").css("display", "block")
                    $("#usertjyh_ts").removeClass().addClass("alert alert-success");

                    // 关闭模态框
                    $('#usertjyh').modal("toggle")
                    //从新请求用户列表
                    user_syyhsj()

                } else {
                    $("#usertjyh_ts").text("请按照格式正确填写信息，一个邮箱只能注册一个账号。").css("display", "block")
                    $("#usertjyh_ts").removeClass().addClass("alert alert-warning");
                }
            });

    } else {
        $("#usertjyh_ts").css("display", "block")
        $("#usertjyh_ts").removeClass().addClass("alert alert-warning");
        $("#usertjyh_ts").text("请全部填写。")
    }
})



// 表单聚焦事件
$("#usertjyh_yhm,#usertjyh_yx,#usertjyh_mm").focus(function () {
    $("#usertjyh_ts").css("display", "none");
});


// 取消修改用户名
$('#usertjyh').on('hidden.bs.modal', function (e) {
    console.log("关闭添加用户模态框，清空模态框内容");
    $("#usertjyh_yhm,#usertjyh_yx,#usertjyh_mm").val("");
    $("#usertjyh_ts").css("display", "none");
})

////////////////

//////////////// 编辑用户弹出框控制


// 点击删除用户按钮
$("#userbjyh_scyhy").click(function () {
    //显示再次确认
    $("#userbjyh_scyhz").css("display", "inline-block")
    $("#userbjyh_scyhy").css("display", "none")
    console.log($.trim($("#userbjyh_bjyx").text()))
})
// 点击再次确认删除用户

$("#userbjyh_scyhz").click(function () {

    // 发送删除请求
    $.post("/user/ycsj", {
            sjnr: "全部账号",
            qqsj: "scyh",
            yhyx: $.trim($("#userbjyh_bjyx").text())
        },
        function (data, status) {
            console.log(data)
            if (data == "ok") {
                console.log("用户删除成功")
                $("#userbjyh_ts").text("用户删除成功。").css("display", "block")
                $("#userbjyh_ts").removeClass().addClass("alert alert-success");

                // 关闭模态框
                $('#userbjyh').modal("toggle")
                //从新请求用户列表
                user_syyhsj()

            } else {
                $("#userbjyh_ts").text("出现错误，无权限。").css("display", "block")
                $("#userbjyh_ts").removeClass().addClass("alert alert-warning");
            }
        });
})


//打开用户编辑 模态框
$("#user_syyhlb").click(function (e) {
    if (e.target.tagName == "BUTTON") {
        console.log("开启用户编辑")
        //获取当前 激活模态框的表单 中的用户相关数据
        var yhm = $.trim($($($(e.target).closest("tr").children()[1]).children()[0]).text());
        var yx = $.trim($($(e.target).closest("tr").children()[2]).text());
        var qx = $.trim($($($(e.target).closest("tr").children()[1]).children()[1]).text());;
        console.log("开启用户编辑" + yhm)
        //向模态框中写入相关数据
        $("#userbjyh_yhm").val(yhm);
        $("#userbjyh_yx").val(yx);
        $("#userbjyh_bjyx").text(yx);
        $("#userbjyh_yhmm").text($.trim($($($(e.target).closest("tr").children()[3]).children()[1]).text()));
        console.log($("#userbjyh_bjyx").text())
        if (qx == "管理员") {
            $("#userbjyh_qx").val("管理员");
        } else {
            $("#userbjyh_qx").val("普通用户");
        }
        // 开启模态框
        $('#userbjyh').modal("toggle");
    }



})

//点击确认修改当前用户
$("#userbjyh_qdtj").click(function (e) {

    // 检查是否为空再，发送ajax请求
    if ($("#userbjyh_yhm,#userbjyh_yx,#userbjyh_mm").val() != "") {
        //密码是否修改判断
        var fsmm;
        if ($.trim($("#userbjyh_mm").val()) != "") {
            console.log("使用新密码")
            fsmm = $.trim($("#userbjyh_mm").val())
        } else {
            console.log("从表格拿去密码")
            fsmm = $.trim($("#userbjyh_yhmm").text())
        }
        console.log("密码：" + fsmm)

        var options = $("#userbjyh_qx option:selected"); //获取选中的项

        // options.text()
        console.log(options.val())

        $.post("/user/ycsj", {
                sjnr: "全部账号",
                qqsj: "bjyh",
                bjyx: $("#userbjyh_bjyx").text(),
                yhm: $.trim($("#userbjyh_yhm").val()),
                yx: $.trim($("#userbjyh_yx").val()),
                mm: fsmm,
                qx: options.val()
            },
            function (data, status) {
                console.log(data)
                if (data == "ok") {
                    console.log("编辑用户成功")
                    $("#userbjyh_ts").text("编辑用户成功。").css("display", "block")
                    $("#userbjyh_ts").removeClass().addClass("alert alert-success");

                    // 关闭模态框
                    $('#userbjyh').modal("toggle")
                    //从新请求用户列表
                    user_syyhsj()

                } else {
                    $("#userbjyh_ts").text("请按照格式正确填写信息，一个邮箱只能注册一个账号。").css("display", "block")
                    $("#userbjyh_ts").removeClass().addClass("alert alert-warning");
                }
            });

    } else {
        $("#userbjyh_ts").css("display", "block")
        $("#userbjyh_ts").removeClass().addClass("alert alert-warning");
        $("#userbjyh_ts").text("请全部填写。")
    }
})


// 表单聚焦事件
$("#userbjyh_yhm,#userbjyh_yx,#userbjyh_mm").focus(function () {
    $("#userbjyh_ts").css("display", "none");
});


// 取消修改用户名
$('#userbjyh').on('hidden.bs.modal', function (e) {
    console.log("关闭添加用户模态框，清空模态框内容");
    $("#userbjyh_yhm,#userbjyh_yx,#userbjyh_mm").val("");
    $("#userbjyh_ts").css("display", "none");
    $("#userbjyh_scyhz").css("display", "none")
    $("#userbjyh_scyhy").css("display", "inline-block")
})

////////////////



// 左侧列表样式控制 传入需要选中的li标签 向选中标签添加选中类名 
function user_sjlbqh(sj) {

    //清空列表选中样式
    $("#user_sjlb li").removeClass("active");
    // 向选中标签添加样式
    sj.addClass("active")
    //渲染右侧内容
    user_sjxr();
}

// 右侧页面内容显示控制 自动检测列表选中状态
function user_sjxr() {
    //需要渲染的请求参数
    var sx;

    $.each($("#user_sjlb li"), function (i, n) {
        if ($(n).attr("class") == "active") {
            sx = $.trim($(n).children().text());
        }
    });

    console.log(sx)

    // 隐藏所有内容
    $("#page-wrapper>div").css("display", "none");

    if (sx == "个人信息") {
        $("#user_grxx").css("display", "block");
    } else if (sx == "全部账号") {
        $("#user_qbzh").css("display", "block");
        //请求用户数据渲染
        user_syyhsj()
    }

}



// 全部账号内容 请求加载 渲染 传入搜索条件 sszd:yhm/yx zdssct:搜索框数据
function user_syyhsj(sszd, zdssct) {
    console.log("开始请求账号数据");

    //清空表单
    $("#user_syyhlb").html("")

    //开启等待动画
    $(".user_login").css("display", "block")

    // 获取的用户数据
    var users;
    if (sszd) {
        //有条件请求全部用户数据
        console.log("有条件请求全部用户数据" + sszd + " " + zdssct);
        $.get("/user/ycsj", {
                sjnr: "全部账号",
                qqsj: "tjss",
                sszd: sszd,
                zdssct: zdssct
            },
            function (data) {
                console.log(JSON.parse(data))
                sjxr(JSON.parse(data))
            });
    } else {
        //无条件请求全部用户数据
        console.log("无条件请求全部用户数据")

        $.get("/user/ycsj", {
                sjnr: "全部账号",
                qqsj: "syyh",
            },
            function (data) {
                // console.log(JSON.parse(data))
                sjxr(JSON.parse(data))
            });
    }

    function sjxr(data) {

        var bh = 1;

        $.each(data.gly, function (i, n) {
            // console.log(n)
            $("#user_syyhlb").append(`
            <tr>
                <td>${bh}</td>
                <td><span>${n.name}</span>
                    <span class="label label-primary" style="margin-left:5px">管理员</span>
                </td>
                <td>${n.email}</td>
                <td><span class="user_mmyc">●●●●●●●●●●●●●●●</span>
                    <span style="display:none" class="user_mmxs">${n.password}</span>
                </td>
                <td>
                    <button type="button" class="btn btn-default btn-xs userbjyh_tc">编辑用户</button>
                </td>
            </tr>
        `)
            bh++
        });

        $.each(data.ptyh, function (i, n) {
            // console.log(n)
            $("#user_syyhlb").append(`
            <tr>
                <td>${bh}</td>
                <td><span>${n.name}</span>
                </td>
                <td>${n.email}</td>
                <td><span class="user_mmyc">●●●●●●●●●●●●●●●</span>
                    <span style="display:none" class="user_mmxs">${n.password}</span>
                </td>
                <td>
                    <button type="button" class="btn btn-default btn-xs userbjyh_tc">编辑用户</button>
                </td>
            </tr>
        `)
            bh++
        });

        //关闭等待动画
        $(".user_login").css("display", "none")
    }
}