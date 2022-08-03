const mongoose = require('mongoose')
const {customEmailValidator} = require('./custom-validators')

const Schema = mongoose.Schema

/* Admin Schema fields are as follows
1. Name (required)
2. email (add validator if input is indeed an email)
3. password (required and must be hashed)
*/
const AdminSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : [true, "Name is required."]
    },
    email : {
        type : String,
        validate: [customEmailValidator, "Invalid email."]
    },
    password : {
        type : String,
        required : [true, "Password is required."],
        minLength : 8
    }
}, {timestamps:true})

module.exports = mongoose.model("AdminSchema", AdminSchema)