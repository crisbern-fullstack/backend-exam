const express = require("express");

const router = express.Router();

//for authentications
const {
  CheckAuthentication,
  IsAdmin,
} = require("../controllers/AuthenticationController");

const {
  AllEmails,
  SendEmail,
  GetOneEmail,
  SendScheduledEmail,
} = require("../controllers/EmailController");

router.use(CheckAuthentication); //checks if user is logged in

router.get("/emails", AllEmails);

router.post("/send-email", SendEmail);

router.get("/emails/:id", GetOneEmail);

router.post("/send-scheduled-email", SendScheduledEmail);

module.exports = router;
