const express = require('express')
const multer = require("multer")
const sizeOf = require('image-size')

//Multer Initialization

//Multer File Filter
const fileFilter = (req, file, callback) => {
    const mime_type = file.mimetype

    if(mime_type === "image/jpeg" || mime_type === "image/png"){
        return callback(null, true)
    }
    else{
        return callback(new Error("Invalid file format. Please upload an image with .jpeg or .png extension"))
    }
}


//needs fixing
//study express error handler
const uploadMiddleware = (req, res, next) => {
    //multer storage
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, "./storage/app/public")
        },
        filename: (req, file, cb) => {
            const file_name = file.originalname
            cb(null, file_name)
        }
    })

    const upload = multer({
        storage : storage,
        limits : {
            fileSize : 6291456
        },
        fileFilter : fileFilter
    }).single("company-logo")

    upload(req, res, (error) => {
        if(error instanceof multer.MulterError){
            res.status(400).json({error : error.message})
            const err = new Error("Multer Error")
            next(err)
        }else if(error){
            res.status(400).json({error : error.message})
            const err = new Error("Error Unknown")
            next(err)
        }
        next()
    })
}

//controllers
const {
    GetAllCompanies,
    AddCompany,
    GetOneCompany,
    DeleteCompany,
    UpdateCompany
} = require("../controllers/AdminController")

//import the express router
const router = express.Router()


//routers start here
//Get All Companies
router.get('/all-companies', GetAllCompanies)

//Get one company
router.get('/company/:id', GetOneCompany)

//Add New Company
router.post('/new-company', uploadMiddleware, AddCompany)

//Delete a company
router.delete('/delete-company/:id', DeleteCompany)

//Update a company
router.patch('/update-company/:id', uploadMiddleware, UpdateCompany)

//exporting created routes
module.exports = router
