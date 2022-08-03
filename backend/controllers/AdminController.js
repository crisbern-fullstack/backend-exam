const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const AdminModel = require("../models/AdminModel")

const AddNewAdmin = async (req, res) => {
    const saltRounds = 10

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
            req.body.password = hash

            try{
                const new_admin = await AdminModel.create(req.body)
                return res.status(200).json(new_admin)
            }catch(error){
                return res.status(400).json({message : error.message})
            }
        })
    })
}


module.exports = {
    AddNewAdmin
}