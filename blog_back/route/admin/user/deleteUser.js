const {User} = require('../../../model/user');
module.exports = async(req,res)=>{
    let {id} = req.query;
    let user = await User.findOneAndDelete({_id:new Object(id)});
    console.log('删除成功');
    res.send({status:1});
}