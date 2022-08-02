const validator = require('email-validator')
//custom email validation
//email-validator returns false if blank
const customEmailValidator = (email) => {
    if(email.length === 0){
        return true
    }

    return validator.validate(email)
}

//url validation
const urlValidator = (url) => {
    if(url.length === 0){
        return true
    }

    try{
        const urlInput = new URL(url)
    }catch(error){
        return false
    }

    return true
}

module.exports = {
    customEmailValidator,
    urlValidator
}