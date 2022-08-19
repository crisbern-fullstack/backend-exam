const express = require("express");

const router = express.Router();

//controllers
const {
  AddEmployee,
  Login,
} = require("../controllers/AuthenticationController");

const { IsAdmin } = require("../middlewares/authentication");

//Add new user/employee
router.post("/signup", IsAdmin, AddEmployee);

router.post("/login", Login);

module.exports = router;
