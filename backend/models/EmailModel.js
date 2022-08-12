const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmailSchema = new Schema(
  {
    sender: String,
    receivers: Array,
    subject: String,
    text: String,
    html: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailSchema", EmailSchema);
