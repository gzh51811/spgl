$(()=>{
    let loginBtn=$(".loginBtn");
    let login=(user,pwd)=>{
        return new Promise((resoleve,reject)=>{
            $.ajax({
                type:"post",
                url:'47.98.205.116/login/user',
                data:{
                    user,
                    pwd
                },
                success(data){
                    resolve(data)
                }
            })
        })
    }

    loginBtn.click(async()=>{
        let user = $(".username").val();
        let pwd = $(".password").val();
        let data = await login(user, pwd);
        let fn={
            success(){
                localStorage.setItem("user",data.token);
                console.log("denglu成功");
            },
            fail(){
                $(".tips").addClass("active").html("密码错误")
            },
        }
        fn[data.status]()
    })
})