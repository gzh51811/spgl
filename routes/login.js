var express = require('express')
var router = express.Router();
var {
  find,
  add,
  del,
  change
}=require("../public/lib/mongo.js");
var token=require("../public/lib/token");
router.get('/', function (req, res, next) {
  res.render('login');
});
//登录路由
router.post("/user",async(req,res,next)=>{
  let{
    user,
    pwd
  }=req.body
  let data =await find('user',{
    name:user,
  })
  if(data[0].password===pwd){
    res,send({
      status:"success",
      token:token.createToken({
        user,
      },300)
    })
  }else{
    res.send({
      status:"fail"
    });
  }
});
//验证用户路由
module.exports = router;