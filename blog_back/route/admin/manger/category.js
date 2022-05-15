const {CateGory} = require('../../../model/category');
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = async(req,res)=>{
    let token = req.headers.pub;
    jwt.verify(token,"zzyzkhxllkmhylwrt",async(err,decode)=>{
        if(err){
            res.status(401).send(err);
        }else{
            let cateGory = await CateGory.find({});
            res.send({
                data:cateGory
            });
        }
    })
}