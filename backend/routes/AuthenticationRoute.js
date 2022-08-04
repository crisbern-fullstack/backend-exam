const express = require("express")

const router = express.Router()

//controllers
const {
    AddEmployee,
    Login
} = require('../controllers/AuthenticationController')


//Add new user/employee
router.post('/signup', AddEmployee)

router.post('/login', Login)

module.exports = router