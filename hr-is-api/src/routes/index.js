// const app = require('express').Router()
const authsControll = require('../auths/index')
const usersControll = require('../controller/index')
const authrorized = require('../auths/validator')
const base = '/head-Set'
exports.Router = (app) => {
    app.post(base+'/login', authsControll.login)
    app.post(base + '/addEmps', authrorized,usersControll.addEmp)
    app.post(base + '/upload', usersControll.uploadFile)
    app.get(base + '/home',authrorized,usersControll.getEmps)
    app.get(base + '/emp/:id', authrorized,usersControll.getEmp)
    app.delete(base + '/delete/:id', authrorized,usersControll.deleteEmp)
}
