const { Manger } = require('../../../model/manger');
const { User } = require('../../../model/user');
const dayjs = require('dayjs')

module.exports = async (req, res) => {
    try {
        let { id, name, menu } = req.body;
        let isTrue = await Manger.updateOne({ _id: new Object(id) }, {
            people: name,
            menus: [...menu],
            useTime: dayjs(+new Date()).format('YYYY年MM月DD日HH:mm:ss'),
        })
        let userName = await Manger.findOne({ _id: new Object(id) });
        let b = await User.updateMany({role:userName.name},{roleAll:userName});
        res.send({
            status: 1
        })
    } catch (err) {
        res.send({
            status: 0
        })
    }
}