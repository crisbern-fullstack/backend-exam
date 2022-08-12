const express = require("express");

const router = express.Router();

//for authentications
const {
  CheckAuthentication,
  IsAdmin,
} = require("../controllers/AuthenticationController");

const { SendEmail } = require("../controllers/EmailController");

router.use(CheckAuthentication); //checks if user is logged in

router.post("/send-email", SendEmail);

module.exports = router;
