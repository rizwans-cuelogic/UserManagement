const validator = require("validator");
const isEmpty =require('./is-Empty');
module.exports = function validateLoginData(data) {
  let errors = {};
  data.username = data.username ? data.username : "";
  data.password = data.password ? data.password : "";

  if (validator.isEmpty(data.username)) {
    errors.email = "email is required.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};


