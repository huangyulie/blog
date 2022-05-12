const {Blog} = require('../../../model/blog')

module.exports = async(req,res)=>{
    let {page,pagesize} = req.query;
    let skipPage = (page-1)*pagesize;
    let b = await Blog.find();
    let a = await Blog.find().skip(skipPage).limit(pagesize);
    let total = b.length;
    let pages = Math.ceil(total/pagesize);
    res.send({
        status:1,
        data:{
            pageNum:page,
            total,
            pages,
            pagesize,
            list:a
        }
    });
}