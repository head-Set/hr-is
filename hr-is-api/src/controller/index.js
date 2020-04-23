const Model = require('../model/index')

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
        "address._id":false
    }
    let check = await Model.listAll(dontMe)
    let sendResponse=[{}]
    check.map(data => {
        return sendResponse.push({
            "id": data._id,
            // "emp_no":data.emp_no,
            "name": data.details,
            "address": data.address,
            "dept": data.department.department
        })
    })
    res.send(sendResponse)
}

exports.getEmp = async (req, res) => {
    let check = await Model.listOne(req.params.id)
    let sendResponse = {
        "name": check.details,
        "add": check.address,
        "dept": check.department
    }
    res.send(sendResponse)
}

exports.deleteEmp = async (req, res) => {
    let resp = await Model.remove(req.params.id)
    res.json(resp)
}