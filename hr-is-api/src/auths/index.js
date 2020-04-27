const Model = require('../model/index').login
const hash = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.login = async (req, res) => {
    // let check = await Model(req.body)
    // if (!check)
    //     res.status(400).send({
    //         status: 404,
    //         message:"NO USER FOUND"
    //     })
    await jwt.sign(req.body, process.env.MYSECRET, { algorithm: "HS512" },(err, token) => {
        if (err) res.send(err)
        res.json({ 'token': token })
    })
}