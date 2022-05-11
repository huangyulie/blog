const mongoose = require('mongoose');

const cateGorySchema = new mongoose.Schema({
    name:String,
    
},{versionKey:false});

const CateGory = mongoose.model('CateGory',cateGorySchema);

async function createUser(){
    const users = await CateGory.create({
        name:'乱写一篇博客'
    }).then(()=>{
        console.log("创建成功")
    }).catch(()=>{
        console.log("用户创建失败")
    })
}
// createUser();

module.exports = {
    CateGory
}