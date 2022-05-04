const express = require('express');
const app = express();

//连接数据库
require('./model/connect');


//处理body的中间件
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req,res)=>{
    res.send({hello:'hello'});
})

app.post('/login',require('./route/login/login_post'));

app.listen(4000,()=>{
    console.log("4000端口已打开");
})

