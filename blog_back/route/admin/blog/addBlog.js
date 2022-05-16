const {Blog} = require('../../../model/blog');

module.exports = async(req,res)=>{
    let {value} = req.body;
    value.imgs = `/img/${value.imgs}`;
    let b = await Blog.create(value);
    res.send({
        status:1
    });
}