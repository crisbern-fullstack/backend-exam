const mongoose = require("mongoose")
const CompanyModel = require("../models/CompanyModel")
const EmployeeModel = require("../models/EmployeeModel")
const sizeOf = require("image-size")
const fs = require("fs")

//QUERIES FOR COMPANY DATA
//Get all companies
const GetAllCompanies = async (req, res) => {
    try{
        const companies = await CompanyModel.find({}).sort({name: 1})
        return res.status(200).json(companies)
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//Get one company
//uses _id
const GetOneCompany = async (req, res) => {
    const {id} = req.params

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    const company = await CompanyModel.findById(id)

    if(!company){
       return res.status(404).json({message:"Company Not Found"})
    }

    res.status(200).json(company)
}

//Add New Company
const AddCompany = async (req, res) => {
    let logo = ''

    //if no image is uploaded, the path will be blank
    if(req.file){
        logo = req.file.path
        const image_dimension = sizeOf(logo)

        //checks image dimensions if at least 100 x 100 pixels
        if(image_dimension.height < 100 || image_dimension.width < 100){
            //deletes image if smaller than 100 x 100 px.
            fs.unlink(logo, (err) => {
                if(err){
                    return res.status(400).json({message : err.message})
                }
            })

            //sends status and tells that the dimensions of the image is smaller than 100x100.
            return res.status(400).json({message : "Image is too small. Minimum dimensions are 100px by 100px."})
        }

        logo = req.file.filename
    }

    try{
        const new_company = await CompanyModel.create({
            name: req.body.name, 
            email: req.body.email, 
            logo: logo, 
            website:req.body.website
        })
        return res.status(200).json(new_company)
    }catch(error){
        return res.status(400).json({error : error.message})
    }
}

//Delete a Company
//uses _id
const DeleteCompany = async (req, res) => {
    const {id} = req.params

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    const deleted_company = await CompanyModel.findByIdAndDelete(id)

    if(!deleted_company){
        return res.status(404).json({message : "Company not found"})
    }

    //deletes logo if it exists
    if(deleted_company.logo){
        fs.unlink('storage/app/public/' + deleted_company.logo, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    res.status(200).json(deleted_company)
}

//update company
const UpdateCompany = async (req, res) => {
    const {id} = req.params
    let update = {}

    if(!req.file){
        update = {...req.body}
    }
    else{
        const image_dimension = sizeOf(req.file.path)

        //checks image dimensions if at least 100 x 100 pixels
        if(image_dimension.height < 100 && image_dimension.width < 100){
            //deletes image if smaller than 100 x 100 px.
            fs.unlink(req.file.path, (err) => {
                if(err){
                    return res.status(400).json({message : err.message})
                }
            })

            //sends status and tells that the dimensions of the image is smaller than 100x100.
            return res.status(400).json({message : "Image is too small. Minimum dimensions are 100px by 100px."})
        }

        update = {
            name : req.body.name,
            email : req.body.email,
            logo : req.file.filename,
            website : req.body.website
        }
    }

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    //runs validator
    try{
        const company = await CompanyModel.findOneAndUpdate({_id : id}, update, {runValidators : true})
        if(!company){
            return res.status(404).json({error:"Company not found"})
        }

        //deletes past logo and replaces it with the new one
        if(company.logo && req.file){
            fs.unlink('storage/app/public/' + company.logo, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }

        return res.status(200).json(company)
    }catch(error){
        return res.status(400).json({error : error.message})
    }
}

//Employees Queries
//Get all Employees
const GetAllEmployees = async(req, res) => {
    try{
        const employees = await EmployeeModel.find({}).sort({name: 1})
        return res.status(200).json(employees)
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}


//Add new Employee.
const AddEmployee = async (req, res) => {
    try{
        req.body.password = "password"
        const new_employee = await EmployeeModel.create(req.body)
        return res.status(200).json(new_employee)
    }catch(error){
        return res.status(400).json({error : error.message})
    }
}

//Get one Employee
const GetOneEmployee = async (req, res) => {
    const {id} = req.params

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    const employee = await EmployeeModel.findById(id)

    if(!employee){
       return res.status(404).json({message:"Company Not Found"})
    }

    return res.status(200).json(employee)
}

//Delete employee
const DeleteEmployee = async (req, res) => {
    const {id} = req.params

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    const deleted_employee = await EmployeeModel.findByIdAndDelete(id)

    if(!deleted_employee){
        return res.status(404).json({message : "Employee not found."})
    }

    return res.status(200).json(deleted_employee)
}

//update employees
const UpdateEmployee = async (req, res) => {
    const {id} = req.params

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    //runs validator
    try{
        const employee = await EmployeeModel.findOneAndUpdate({_id : id}, {...req.body})
        if(!employee){
            return res.status(404).json({error:"Employee not found"})
        }
        return res.status(200).json(employee)
    }catch(error){
        return res.status(400).json({error : error.message})
    }
}

module.exports = {
    GetAllCompanies,
    AddCompany,
    GetOneCompany,
    DeleteCompany,
    UpdateCompany,
    AddEmployee,
    GetAllEmployees,
    GetOneEmployee,
    DeleteEmployee,
    UpdateEmployee
}