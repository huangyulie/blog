const express = require('express');
const jwt = require('jsonwebtoken');


const admin = express.Router();
// 后台表单路由界面
admin.get('/index/list',(req,res)=>{
    let token = req.headers.pub;
    jwt.verify(token,"zzyzkhxllkmhylwrt",(err,decode)=>{
        if(err){
            res.status(401).send(err);
        }else{
            res.send({status:1});
        }
    })
})

module.exports = admin;