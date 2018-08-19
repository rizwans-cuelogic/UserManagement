const validator = require("validator");
const isEmpty =require('./is-Empty');
module.exports = function validateLoginData(data) {
  let errors = {};
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "email is required.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email should be valid";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};


