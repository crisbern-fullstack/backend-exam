const express = require('express') //imports express

//controllers
const {
    AddNewAdmin
} = require("../controllers/AdminController")

//imports express router
const router = express.Router()

router.post('/new-admin', AddNewAdmin)

module.exports = router