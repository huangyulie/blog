const {CateGory} = require('../../../model/category');

module.exports = async(req,res)=>{
    let cateGory = await CateGory.find({});
    res.send({
        status:1,
        data:cateGory
    });
}