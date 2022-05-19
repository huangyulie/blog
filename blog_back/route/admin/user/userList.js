const {User} = require('../../../model/user');
const dayjs = require('dayjs');

module.exports = async(req,res)=>{
    let users = await User.find({});
    res.send(users);
}
