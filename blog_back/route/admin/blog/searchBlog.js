let {Blog}  = require('../../../model/blog');

module.exports = async(req,res)=>{
    let {page,pagesize,name,value} = req.query;
    let a,total;
    let pages =  Math.ceil(total/pagesize);
    let contition1 = {name: new RegExp(`^.*${value}.*$`)}
    let contition2 = {desc: new RegExp(`^.*${value}.*$`)}
    if(name == 'name'){   
        a = await Blog.find(contition1);
        total = a.length;
    }else{
        a = await Blog.find(contition2);
        total = a.length;
    }
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