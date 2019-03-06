// 登陆验证，检查节点内所有输入框，发现错误触发警告样式 更改提示信息
function ym_login_yz(domd, ztgg) {
    // console.log(ztgg)
    var yzjg = true;
    $.each(domd, function (i, n) {
        //当前输入框的type属性
        var dtype = $(n).attr("type");
        //邮箱验证
        if (dtype == "email") {
            //邮箱验证正则
            var emailzz = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
            if (!emailzz.test(n.value) && n.value != "") {
                if (ztgg) {
                    //切换错误的样式
                    $(n.parentNode).addClass("has-error");
                    $(n.parentNode.firstElementChild).text("Email 电子邮箱 输入有误");
                }
                // console.log("邮箱不通过")
                //按钮状态改变
                yzjg = false;
            }
            if (n.value == "") {
                yzjg = false;
            }

        }
        if (dtype == "password") {
            //密码验证正则
            var pswzz = /^[a-z0-9_-]{6,16}$/;
            if (!pswzz.test(n.value) && n.value != "") {
                if (ztgg) {
                    //切换错误的样式
                    $(n.parentNode).addClass("has-error");
                    $(n.parentNode.firstElementChild).text("密码 输入有误");
                }
                // console.log("密码不通过")
                yzjg = false;
            }
            if (n.value == "") {
                yzjg = false;
            }
        }
    });

    return yzjg;
}

//失去焦点触发验证
$(".form-group input").blur(function (e) {
    ym_login_yz($(".form-group input"), true);
})

//获取焦点清空错误提示
$(".form-group input").focus(function (e) {
    // console.log("获取焦点")
    $.each($(".form-group input"), function (i, n) {
        //判断是否带有错误提示
        if ($(n.parentNode).hasClass("has-error")) {
            $(n.parentNode.firstElementChild).text(function (x, oldcontent) {
                // console.log(oldcontent)
                var sczf = oldcontent.slice(0, -4);
                return sczf;
            });
        }

    })
    //清空样式
    $(".form-group input").closest("div").removeClass("has-error");
});

//按钮状态更新
$(".form-group input").keyup(login_anzt)
//按钮状态更新 函数
function login_anzt() {
    var zt = ym_login_yz($(".form-group input"), false);
    if (zt) {
        $("#ym_login_dl").attr("disabled", false);
    } else {
        $("#ym_login_dl").attr("disabled", true);
    }
}


//点击登陆按钮
$("#ym_login_dl").click(function () {
    $.post("/login/dl", {
            "email": $("#exampleInputEmail1")[0].value,
            "password": $("#exampleInputPassword1")[0].value
        },
        function (data, status) {
            // console.log(JSON.parse(data))
            //如果账号密码正确 执行登陆成功跳转页面函数
            if (JSON.parse(data) == "ok") {
                //成功跳转函数
                console.log("登陆成功")
                login_indlzt();
            } else {
                srkqk();
                alert("账号或密码错误,请重新登陆");
                login_anzt();
            }
        });
});

//输入框清空
function srkqk() {
    $("#exampleInputEmail1")[0].value = "";
    $("#exampleInputPassword1")[0].value = "";
}

//登陆成功 跳转函数
function login_indlzt() {
    $("#ym_login_dl").addClass("btn-success");
    $("#ym_login_dl").attr("disabled", false);
    $("#ym_login_dl").text("登陆成功，即将跳转。");
    setTimeout(function () {
        window.location.reload();
    }, 900);
}