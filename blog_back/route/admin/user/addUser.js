const {User} = require('../../../model/user');
const {Manger} = require('../../../model/manger');
const bcrypt = require('bcryptjs');

module.exports = async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password,salt);
    req.body.password = pass;
    req.body.create_time = +new Date();
    let {role} = req.body;
    const userRole = await Manger.findOne({name:role});
    console.log(userRole);
    req.body.roleAll = userRole;
    console.log(role);
    let user = await User.create(req.body);
    console.log('添加成功');
    res.send({status:1});
}