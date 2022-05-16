const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..','..', 'public/img')


module.exports = (req, res) => {
    const { value } = req.body;
    fs.unlink(path.join(dirPath, value), (err) => {
        if (err) {
            console.log(err)
            res.send({
                status: 1,
                msg: '删除文件失败'
            })
        } else {
            res.send({
                status: 0
            })
        }
    })
}