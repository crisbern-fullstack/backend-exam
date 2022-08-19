const express = require("express");

const router = express.Router();

//for authentications
const { CheckAuthentication } = require("../middlewares/authentication");

const {
  AllEmails,
  SendEmail,
  GetOneEmail,
  DeleteEmail,
  SendScheduledEmail,
} = require("../controllers/EmailController");

router.use(CheckAuthentication); //checks if user is logged in

router.get("/emails", AllEmails);

router.post("/send-email", SendEmail);

router.delete("/email/:id", DeleteEmail);

router.get("/email/:id", GetOneEmail);

router.post("/send-scheduled-email", SendScheduledEmail);

module.exports = router;
