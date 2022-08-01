const mongoose = require('mongoose')

const Schema = mongoose.Schema

/* Company Schema fields are as follows
1. Name (required)
2. email (add validator if input is indeed an email)
3. logo (min. 100x100 in size and maximun suze of 2mb) (this will be a path instead of the image itself)
4. website (add url validators)
*/
const CompanySchema = new Schema({
    name : {
        type : String,
        required : [true, "Company name is required."]
    },
    email : String,
    logo : String,
    website : String
}, {timestamps:true})

module.exports = mongoose.model("CompanySchema", CompanySchema)