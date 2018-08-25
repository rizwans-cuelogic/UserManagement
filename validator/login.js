const validator = require("validator");
const isEmpty = require('./is-Empty');
module.exports = function validateLoginData(data) {
  let errors = {};
  data.userName = data.userName ? data.userName : "";
  data.password = data.password ? data.password : "";

  if (validator.isEmpty(data.userName)) {
    errors.userName = " is required.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
};