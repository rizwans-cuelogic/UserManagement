const validator = require("validator");

const isEmpty = require("./is-Empty.js");

module.exports = function validateRegisterInput(data) {
  console.log("Data....", data);

  let errors = {};

  data.userName = data.username ? data.username : "";
  data.password = data.password ? data.password : "";
  data.firstName = data.firstName ? data.firstName : "";
  data.lastName = data.lastName ? data.lastName : "";

  if (validator.isEmpty(data.userName)) {
    errors.userName = "name is required.";
  }
  if (
    !validator.isLength(data.userName, {
      min: 4,
      max: 12
    })
  ) {
    errors.userName = "name should be 4 to 30 chars long";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
