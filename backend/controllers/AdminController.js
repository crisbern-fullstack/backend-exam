const mongoose = require("mongoose")
const AdminModel = require("../models/AdminModel")

const AddNewAdmin = async (req, res) => {
    try{
        const new_admin = await AdminModel.create(req.body)
        return res.status(200).json(new_admin)
    }catch(error){
        return res.status(400).json({message : error.message})
    }
}


module.exports = {
    AddNewAdmin
}