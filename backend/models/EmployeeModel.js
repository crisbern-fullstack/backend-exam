const mongoose = require('mongoose')
const {customEmailValidator} = require('./custom-validators')

const Schema = mongoose.Schema

/* Employree Schema fields are as follows
1. First Name (required)
2. Last Name (required)
3. Company (foreign key)
4. Email
5. Password
6. Phone
*/
const EmployeeSchema = new Schema({
    first_name : {
        type: String,
        required: [true, "First name is required."]
    },
    last_name: {
        type: String,
        required: [true, "Last name is required."]
    },
    company : {
        type: mongoose.ObjectId
    },
    email : {
        type : String,
        validate : [customEmailValidator, "Invalid email address."]
    },
    password : {
        type : String,
        required : [true, "Password"]
    },
    phone : {
        type: Number
    }
}, {timestamps:true})

module.exports = mongoose.model("EmployeeSchema", EmployeeSchema)
