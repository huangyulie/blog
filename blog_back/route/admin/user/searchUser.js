const {User} = require('../../../model/user');

module.exports = async(req,res)=>{
    let {_id} = req.query;
    let user = await User.findOne({_id:new Object(_id)});
    res.send(user);
}