const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { urlValidator, emailValidator } = require("../utils/schema-validators");

const Schema = mongoose.Schema;

/* Company Schema fields are as follows
1. Name (required)
2. email (add validator if input is indeed an email)
3. logo (min. 100x100 in size and maximun suze of 2mb) (this will be a path instead of the image itself)
4. website (add url validators)
*/
const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required."],
    },
    email: {
      type: String,
      validate: [emailValidator, "Invalid email."],
    },
    logo: String,
    website: {
      type: String,
      validate: [urlValidator, "Invalid Company URL"],
    },
  },
  { timestamps: true }
);

CompanySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("CompanySchema", CompanySchema);
