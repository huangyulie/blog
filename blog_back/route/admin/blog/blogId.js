const {Blog}  = require('../../../model/blog');

module.exports = async(req,res)=>{
    let {id} = req.query;
    let blog = await Blog.findOne({_id:new Object(id)});
    console.log(blog);
    if(blog){
        res.send(blog);
    }else{
        res.send('失败');
    }
}