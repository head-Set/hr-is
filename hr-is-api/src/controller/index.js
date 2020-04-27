const Model = require('../model/index')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
exports.addEmp = async (req, res) => {
    let details = {
        "emp_no": req.body.emp_no,
        "details.fname": req.body.fname,
        "details.mname": req.body.mname,
        "details.lname": req.body.lname,
        "details.ext_name": req.bodyext_name,
        "details.bday": req.bodybday,
        "details.bplace": req.bodybplace,
        "details.sex": req.bodysex,
        "details.civilStatus": req.bodycivilStatus,
        "details.height": req.body.height,
        "details.weight": req.body.weight,
        "bloodType": req.body.bloodType,
        "citezenship": req.body.citezenship,
        "email": req.body.email,
        "type": req.body.type,
        "status": req.body.status,
        "address": {
            "r_add": req.body.r_add,
            "r_zip": req.body.r_zip,
            "p_add": req.body.p_add,
            "p_zip": req.body.p_zip,
            "tel": req.body.tel,
            "telNo": req.body.telNo,
            "contact": req.body.contact,
        },
        "department": {
            "department": req.body.department
        },
        "benefits": {
            "gsis": req.body.gsis,
            "pagIbi": req.body.pagIbi,
            "philhealth": req.body.philhealth,
            "sss": req.body.sss,
            "tin": req.body.tin,
        },
        "accPrev": {
            "previlage": req.body.previlage,
        },
        "salarygrade": {
            "grade": req.body.grade,
            "step": req.body.step,
        }
    }
    await Model.createParent(details, err => {
        res.status(400).send({
            status: 401,
            message: "FAILED SUCCESSFULLY",
            data: err.errmsg
        })
    }, data => {
        res.send({
            status: 201,
            message: "CREATED SUCCESSFULLY",
            data: data._id
        })
    })

}

exports.getEmps = async (req, res) => {
    let dontMe = {
        __v: false,
        "benefits": false,
        "address._id": false
    }
    let check = await Model.listAll(dontMe)
    let sendResponse = []
    check.map(data => {
        let check = ''
        if (data.details.ext_name != undefined) {
            check = data.details.ext_name
        }
        return sendResponse.push({
            "id": data._id,
            "emp_no": data.emp_no,
            "name": data.details.lname.toUpperCase() + ', ' + data.details.fname.toUpperCase() + ' ' + data.details.mname.toUpperCase() + ' ' + check.toUpperCase(),
            // "name": data.details.lname + ', ' + data.details.fname + ' ' + data.details.mname + ' ' + check,
            "salary": data.salarygrade.grade,
            "step": data.salarygrade.step,
            "depts": data.department.department
        })
    })
    res.send(sendResponse)
}

exports.getEmp = async (req, res) => {
    let check = await Model.listOne(req.params.id)
    let sendResponse=[]
    if (check==null||check=='') {
        return sendResponse.push({
            "error":"Error"
        })
    } else {
        sendResponse.push({
            "id": check._id,
            "name": check.details.lname.toUpperCase() + ', ' + check.details.fname.toUpperCase() + ' ' + check.details.mname.toUpperCase() + ' ',
            "add": check.address,
            "dept": check.department.department
        })
    }
    res.send(sendResponse)
}

exports.deleteEmp = async (req, res) => {
    let resp = await Model.remove(req.params.id)
    res.json(resp)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdir('./uploads', (err) => {
            if (err) console.log(err.stack)
            cb(null, './uploads')
        })
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase() + '.png')
    }
})
const fileFilter = (req, file, cb) => {
    let allowed = ['image/jpg', 'image/jpeg', 'image/png']
    if (allowed.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('failed'))
    }
}
const uploadConfig = {
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024
    },
    filefilter: fileFilter
}
const upload = multer(uploadConfig).single('file')

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err) res.send(err)
        res.send("uploaded")
    })
}