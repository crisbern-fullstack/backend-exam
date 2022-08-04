const jwt = require('jsonwebtoken')
const EmployeeModel = require('../models/EmployeeModel')
const bcrypt = require('bcrypt')
require('dotenv').config()

const createToken = async (_id, is_admin) => {
    return jwt.sign({ _id, is_admin }, process.env.JWT_SECRET,{
        expiresIn: '3d'
    })
}

//Checks if user is authenticated
const CheckAuthentication = async (req, res, next) => {
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({message:"Authorization is required."})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id, is_admin} = jwt.verify(token, process.env.JWT_SECRET)

        const user = await EmployeeModel.findById(_id).select('_id email')
        next()
    }catch(err){
        return res.status(401).json({message:"Unauthorized."})
    }
}


//Add Employee or sign up. Only admin can add employees
const AddEmployee = async (req, res) => {
    try{
        req.body.password = "password"
        const new_employee = await EmployeeModel.create(req.body)

        const token = await createToken(new_employee._id, new_employee.is_admin)

        return res.status(200).json({email:new_employee._id, token:token})
    }catch(error){
        return res.status(400).json({error : error.message})
    }
}

//Login
const Login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await EmployeeModel.findOne({email:email})

    //finds user by email
    //return a response if no such user found
    if(!user){
        return res.status(404).json({message:"No such employee found."})
    }

    //executes if there is a user
    const passwords_matched = await bcrypt.compare(password, user.password)

    if(passwords_matched){
        const token = await createToken(user._id, user.is_admin)
        return res.status(200).json({
            message: "Successfully Logged in!",
            email: user.email,
            token: token
        })
    }

    return res.status(400).json({message:"Invalid Credentials."})
}

module.exports = {
    CheckAuthentication,
    AddEmployee,
    Login,
}