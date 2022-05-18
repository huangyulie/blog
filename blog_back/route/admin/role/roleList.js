const {Manger} = require('../../../model/manger');

module.exports = async(req,res)=>{
    let list =await Manger.find({});
    res.send(list);
}