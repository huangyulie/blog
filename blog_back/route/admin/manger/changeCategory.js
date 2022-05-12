const express = require('express');
const jwt = require('jsonwebtoken');
const {CateGory} = require('../../../model/category');

module.exports = (req,res)=>{
    let token = req.headers.pub;
    jwt.verify(token,"zzyzkhxllkmhylwrt",async(err,decode)=>{
        if(err){
            res.status(401).send(err);
        }else{
            let {prename,name} = req.body;
            let user = await CateGory.findOne({name:name});
            if(!user){
                await CateGory.updateOne({name:prename},{name:name});
                res.send('修改成功');
            }else{
                res.send("该分类已存在");
            }
        }
    })
}