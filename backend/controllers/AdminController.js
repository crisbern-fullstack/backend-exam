const { default: mongoose } = require("mongoose")
const CompanyModel = require("../models/CompanyModel")


//QUERIES FOR COMPANY DATA

//Get all companies
const GetAllCompanies = async (req, res) => {
    try{
        const companies = await CompanyModel.find({}).sort({name: 1})
        res.status(200).json(companies)
    }catch(error){
        res.status(400).json({error:error.message})
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
   const {name, email, logo, website} = req.body

   try{
        const new_company = await CompanyModel.create({name, email, logo, website})
        res.status(200).json(new_company)
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

    res.status(200).json(deleted_company)
}

//update company
const UpdateCompany = async (req, res) => {
    const {id} = req.params

    //checks if passed id is valid
    //invalid IDs can crash the server
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid ID"})
    }

    const company = await CompanyModel.findByIdAndUpdate(id, {...req.body})

    if(!company){
        return res.status(404).json({error:"Comoany not found"})
    }

    res.status(200).json(company)
}

module.exports = {
    GetAllCompanies,
    AddCompany,
    GetOneCompany,
    DeleteCompany,
    UpdateCompany
}