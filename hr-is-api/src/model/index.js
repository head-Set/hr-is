const mongoose = require('./model.config').mongoose;
const Schema = mongoose.Schema;

// const Employees = new Schema({
//     emp_no: { type: Number, unique:true},
//     details: {
//         fname: String,
//         mname: String,
//         lname: String,
//         ext_name: String,
//         bday: String,
//         bplace: String,
//         sex: String,
//         civilStatus: String,
//         height: String,
//         weight: String,
//     },
//     bloodType: String,
//     citezenship: String,
//     email: String,
//     type: String,
//     // img: String,
//     status: String,
//     address: [{ type: Schema.Types.ObjectId, ref: 'EmpAddress' }],
//     department: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
//     benefits: [{ type: Schema.Types.ObjectId, ref: 'Benefits' }],
//     accPrev: [{ type: Schema.Types.ObjectId, ref: 'AccountPrevilage' }],
//     salarygrade: [{ type: Schema.Types.ObjectId, ref: 'SalaryGrade' }],
// })
const EmpAddress = new Schema({
    // _Id: { type: Schema.Types.ObjectId, ref: 'Employees' },
    r_add: String,
    r_zip: String,
    p_add: String,
    p_zip: String,
    telephone: {
        tel: Number,
        telNo: Number,
        contact: Number
    }
})
const Department = new Schema({
    // _Id: { type: Schema.Types.ObjectId, ref: 'Employees' },
    department: String
})
const Benefits = new Schema({
    // _Id: { type: Schema.Types.ObjectId, ref: 'Employees' },
    gsis: String,
    pagIbi: String,
    philhealth: String,
    sss: String,
    tin: String
})
const AccountPrevilage = new Schema({
    _Id: { type: Schema.Types.ObjectId, ref: 'Employees' },
    previlage: String,
})
const SalaryGrade = new Schema({
    // _Id: { type: Schema.Types.ObjectId, ref: 'Employees' },
    grade: String,
    step: String,
})
const Employees = new Schema({
    emp_no: { type: Number, unique: true },
    details: {
        fname: String,
        mname: String,
        lname: String,
        ext_name: String,
        bday: String,
        bplace: String,
        sex: String,
        civilStatus: String,
        height: String,
        weight: String,
    },
    bloodType: String,
    citezenship: String,
    email: String,
    type: String,
    // img: String,
    status: String,
    address: EmpAddress,
    department: Department,
    benefits: Benefits,
    accPrev: AccountPrevilage,
    salarygrade: SalaryGrade
})

const Emp = mongoose.model('Employees', Employees)
mongoose.model('EmpAddress', EmpAddress)
mongoose.model('Department', Department)
mongoose.model('Benefits', Benefits)
mongoose.model('AccountPrevilage', AccountPrevilage)
mongoose.model('SalaryGrade', SalaryGrade)

exports.createParent = (UserData, errorCallback, successCallback) => {
    let newUser = new Emp(UserData)
    return newUser.save((err, data) => {
        if (err) errorCallback(err)
        successCallback(data)
    })
}
exports.listAll = (dontMe) => {
    return Emp.find({},dontMe)
}
exports.listOne = (userData) => {
    return Emp.findById(userData)
}
exports.remove = (request) => {
    return Emp.remove({ _id: request})
    // return Emp.remove()
}
exports.login = (userData) => {
    return Emp.findOne(userData, (err, data) => {
        if (err) return err
        return data
    })
}