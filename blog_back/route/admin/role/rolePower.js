const {Manger} = require('../../../model/manger');
const dayjs = require('dayjs')

module.exports = async(req,res)=>{
    try{
        let {id,name,menu} = req.body;
        let isTrue =await Manger.updateOne({_id:new Object(id)},{
            people:name,
            menus:[...menu],
            useTime:dayjs(+new Date()).format('YYYY年MM月DD日HH:mm:ss'),
        })
        res.send({
            status:1
        })
    }catch(err){
        res.send({
            status:0
        })
    }
}