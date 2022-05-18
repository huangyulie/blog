const dayjs = require('dayjs');
const { Manger } = require('../../../model/manger');

module.exports = async (req, res) => {
    let { name } = req.query;
    let isRole = await Manger.findOne({ name });
    if (!isRole) {
        let time = dayjs(+new Date()).format("YYYY年MM月DD日HH:mm:ss");
        let role = await Manger.create({
            name: name,
            menus: [],
            createTime: time,
            useTime: '未授权',
            people: '未授权'
        })
        console.log('角色创建成功');
        res.send({
            status: 1
        })
    }else{
        res.send({
            status:0
        })
    }

}