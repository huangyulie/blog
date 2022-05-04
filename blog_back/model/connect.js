const mongoose = require('mongoose');

mongoose.connect('mongodb://blog:hyl20030515@150.158.23.19:27017/Blog').then(
    ()=>{console.log('数据库连接成功');}
).catch((err)=>{
    console.log('数据库连接失败'+err);
})