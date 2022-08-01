const express = require('express')
const multer = require("multer")

//Multer Initialization
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'logos')
    },
    filename: (req, file, cb) => {
        const file_name = file.originalname
        cb(null, file_name)
    }
})

const upload = multer({storage : storage})

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
router.post('/new-company', upload.single('company-logo'),AddCompany)

//Delete a company
router.delete('/delete-company/:id', DeleteCompany)

//Update a company
router.patch('/update-company/:id', upload.single('company-logo'), UpdateCompany)

//exporting created routes
module.exports = router