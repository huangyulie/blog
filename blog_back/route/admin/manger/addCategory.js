const {CateGory} = require('../../../model/category')
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = async(req,res)=>{
    let token = req.headers.pub;
    jwt.verify(token,"zzyzkhxllkmhylwrt",async(err,decode)=>{
        if(err){
            res.status(401).send(err);
        }else{
            const {name} = req.body;
            let a = await CateGory.findOne({name:name});
            if(!a){
                console.log('新加分类'+req.body.name);
                let c = await CateGory.create({name});
                res.send(c);
            }else{
                res.send('该分类已存在');
            }
        }
    })

    
}