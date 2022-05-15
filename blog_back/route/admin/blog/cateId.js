let {CateGory} = require('../../../model/category');

module.exports = async(req,res)=>{
    try{
        let {id} = req.query;
        let blog = await CateGory.findOne({_id:new Object(id)});
        res.send(blog);
    }catch(err){
        res.send(err);
    }
}