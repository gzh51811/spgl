// 点击列表选中 拿取当前点击的列表 li节点
$("#index_sjlb").click(function (e) {
    var lbjd;
    lbjd = $(e.target).closest("li");

    //筛选非下拉菜单的li
    if (lbjd.attr("class") != "dropdown") {
        index_sjlbqh(lbjd)
    }

    console.log(lbjd);
});
// 切换显示内容 传入需要显示的 参数
function index_sjlbqh(sj) {
    console.log("选中");
}