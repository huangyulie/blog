const {User} = require('../../model/user'); 
const bcrypt = require('bcryptjs');

module.exports = async(req,res)=>{
    let {username,password} = req.body;
    try{
        let user = await User.findOne({username});
        let phone = await User.findOne({phone:username});
        if(user!==null || phone!==null){
            let users = user!==null?user:phone;
            let person = {users,token:'13123123'};
            let isEqual = await bcrypt.compare(password,users.password);
            if(isEqual){
                res.send({status:0,msg:'登陆成功',person});
            }else{
                res.send({status:1,msg:'用户名或者密码不正确'});
            }
        }else{
            res.send({status:1,msg:'用户名或者密码不正确'});
        }
    }catch(err){
        console.log('登录失败');
        res.send('登录失败'+err);
    }
}