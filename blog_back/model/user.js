//导入bcrypt模块
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://blog:hyl20030515@150.158.23.19:27017/Blog').then(
//     ()=>{console.log('数据库连接成功');}
// ).catch((err)=>{
//     console.log('数据库连接失败'+err);
// })

// username: {type: String, required: true}, // 用户名
//   password: {type: String, required: true}, // 密码
//   phone: String,
//   email: String,
//   create_time: {type: Number, default: Date.now},
//   role_id: String

//创建用户集合
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:String,
    email:String,
    create_time:{
        type:Number,
        default:Date.now
    },
    role:String
});
//创建集合并应用规则
const User = mongoose.model('User',userSchema);//courses

async function createUser(){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('hyl20030515',salt);
    const users = await User.create({
        username:'Miroku',
        password: pass,
        phone:'19991396321',
        email:'1279072972@qq.com',
        role:'admin'
    }).then(()=>{
        console.log("创建成功")
    }).catch(()=>{
        console.log("用户创建失败")
    })
}
// createUser();

module.exports = {
   User
}