const express = require('express');
const app = express();
const path = require('path');

//连接数据库
require('./model/connect');


//处理body的中间件
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 静态资源
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
    res.send({hello:'hello'});
})
//登录的接口文件
app.post('/login',require('./route/login/login_post'));

//后台的文件

//引入二级路由
const admin = require('./route/admin/admin');
//后台一级路由
app.use('/admin',admin);

app.listen(4000,()=>{
    console.log("4000端口已打开");
})

