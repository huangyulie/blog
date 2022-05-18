const mongoose = require('mongoose');

const mangerSchema = new mongoose.Schema({
    name:String,
    menus:Array,
    createTime:String,
    useTime:String,
    people:String
},{versionKey:false});

const Manger = mongoose.model('Manger',mangerSchema);

async function createUser(){
    const users = await Manger.create({
        name:'博客管理员',
        menus:['哈哈','嘻嘻','我是傻逼'],
        createTime:'2001-2-2',
        useTime:'2002-2-2',
        people:'Miroku'
    }).then(()=>{
        console.log("创建成功")
    }).catch(()=>{
        console.log("用户创建失败")
    })
}
// createUser();

module.exports = {
    Manger
}