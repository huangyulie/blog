const {User} = require('../../../model/user');
const {Manger} = require('../../../model/manger');
const bcrypt = require('bcryptjs');

module.exports = async(req,res)=>{
    let {id,data} = req.body;
    let r = await Manger.findOne({name:data.role});
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(data.password,salt);
    console.log(r);
    let user = await User.updateOne({_id:new Object(id)},{
        username:data.username,
        password:pass,
        email:data.email,
        phone:data.phone,
        role:data.role,
        roleAll:r
    })
    res.send(req.body)
}