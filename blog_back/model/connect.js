const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/2002').then(
    ()=>{console.log('数据库连接成功');}
).catch((err)=>{
    console.log('数据库连接失败'+err);
})