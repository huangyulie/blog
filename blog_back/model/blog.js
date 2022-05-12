const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    imgs:String,
    name:String,
    desc:String,
    time:String,
    people:String,
    categoryId:String,
    detail:String,
},{versionKey:false});

const Blog = mongoose.model('Blog',blogSchema);


async function createUser(){
    const users = await Blog.create({
        name:'技术博客',
        desc:'哈哈',
        time:'2022-01-032',
        people:'黄欲烈',
        categoryId:'627a564c4c297ed5b86f0084',
        detail:'<p>曹尼玛</p>',
    }).then(()=>{
        console.log("创建成功")
    }).catch(()=>{
        console.log("用户创建失败")
    })
}
// createUser();

module.exports = {
    Blog
}