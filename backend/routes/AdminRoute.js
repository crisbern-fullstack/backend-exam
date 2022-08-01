const express = require('express')

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
router.post('/new-company', AddCompany)

//Delete a company
router.delete('/delete-company/:id', DeleteCompany)

//Update a company
router.patch('/update-company/:id', UpdateCompany)

//exporting created routes
module.exports = router