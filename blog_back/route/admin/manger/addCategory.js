const {CateGory} = require('../../../model/category')
module.exports = async(req,res)=>{
    console.log(req.body);
    const {name} = req.body;
    let a = await CateGory.findOne({name:name});
    console.log(a);
    if(!a){
        let c = await CateGory.create({name});
        res.send(c);
    }else{
        res.send('该分类已存在');
    }
}