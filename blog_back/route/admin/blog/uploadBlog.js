const { Blog } = require('../../../model/blog');

module.exports = async (req, res) => {
    let { id, data } = req.body;
    let blog = await Blog.updateOne({ _id: new Object(id) }, data);
    res.send({
        status: 1
    });
}