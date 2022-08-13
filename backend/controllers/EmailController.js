const { sendEmail } = require("../email-test");
const EmailModel = require("../models/EmailModel");

const SendEmail = async (req, res) => {
  const receivers = req.body.receivers;
  const email_args = {
    sender: req.body.sender,
    receivers: receivers.split(" "),
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html,
  };
  try {
    await sendEmail(email_args);
    await EmailModel.create(email_args);
    return res.status(200).json({ message: "Email Succesfully Sent" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

module.exports = { SendEmail };
