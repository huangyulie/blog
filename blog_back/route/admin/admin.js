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

// 后台获取基本列表
admin.get('/manger/category/list',require('./manger/category'));

// 后台添加分类列表
admin.post("/manger/category/addList",require('./manger/addCategory'));

// 后台修改分类的列表
admin.post('/manger/category/changeList',require('./manger/changeCategory'));

// 后台的详细博客列表
admin.get("/blog/list",require('./blog/blogList'));

// 后台搜索博客列表
admin.get("/blog/search",require('./blog/searchBlog'));

//根据id搜索博客
admin.get('/blog/id',require('./blog/blogId'));

// 根据id搜索博客分类
admin.get('/blog/cateId',require('./blog/cateId'));

module.exports = admin;