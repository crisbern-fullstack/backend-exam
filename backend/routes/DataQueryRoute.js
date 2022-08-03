const express = require('express')
const {uploadMiddleware} = require('./multer-initialization')

//controllers
const {
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


//Employees
//Get All Employees
router.get('/all-employees', GetAllEmployees)

//Add new employee
router.post('/new-employee', AddEmployee)

//Get one employee
router.get('/employee/:id', GetOneEmployee)

//Delete employee
router.delete('/delete-employee/:id', DeleteEmployee)

//Update employee
router.patch('/update-employee/:id', UpdateEmployee)

//exporting created routes
module.exports = router
