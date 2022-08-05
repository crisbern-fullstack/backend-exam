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
    UpdateEmployee,
} = require("../controllers/DataQueryController")

const {
    CheckAuthentication,
    IsAdmin
} = require('../controllers/AuthenticationController')

//import the express router
const router = express.Router()

//routers start here
router.use(CheckAuthentication)

//Get All Companies
router.get('/all-companies', GetAllCompanies)

//Get one company
router.get('/company/:id', GetOneCompany)

//Add New Company (admin only)
router.post('/new-company', IsAdmin, uploadMiddleware, AddCompany)

//Delete a company (admin only)
router.delete('/delete-company/:id', IsAdmin, DeleteCompany)

//Update a company (admin only)
router.patch('/update-company/:id', IsAdmin, uploadMiddleware, UpdateCompany)


//Employees
//Get All Employees
router.get('/all-employees', GetAllEmployees)

//Get one employee
router.get('/employee/:id', GetOneEmployee)

//Delete employee
router.delete('/delete-employee/:id', isAdmin, DeleteEmployee)

//Update employee
router.patch('/update-employee/:id', isAdmin, UpdateEmployee)

//exporting created routes
module.exports = router
