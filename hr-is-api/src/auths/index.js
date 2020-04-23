const Model = require('../model/index').login
const hash = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    let check = await Model(req.body)
    if (!check)
        res.status(400).send({
            status: 404,
            message:"NO USER FOUND"
        })
    let token = jwt.sign({emp_no:check.emp_no}, process.env.MYSECRET)
    res.send(token)
}