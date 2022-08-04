const express = require('express')
const {uploadMiddleware} = require('./multer-initialization')

//controllers
const {
    GetAllCompanies,
    AddCompany,
    GetOneCompany,
    DeleteCompany,
    UpdateCompany,
    GetAllEmployees,
    GetOneEmployee,
    DeleteEmployee,
    UpdateEmployee
} = require("../controllers/DataQueryController")

const {CheckAuthentication} = require('../controllers/AuthenticationController')

//import the express router
const router = express.Router()

//routers start here
router.use(CheckAuthentication)

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


//Employees
//Get All Employees
router.get('/all-employees', GetAllEmployees)

//Get one employee
router.get('/employee/:id', GetOneEmployee)

//Delete employee
router.delete('/delete-employee/:id', DeleteEmployee)

//Update employee
router.patch('/update-employee/:id', UpdateEmployee)

//exporting created routes
module.exports = router
