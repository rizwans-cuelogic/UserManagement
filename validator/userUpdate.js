const validator = require('validator');

const isEmpty =require('./is-Empty.js');


module.exports=function validateUserUpdateInput(data){
  let errors = {};
  data.userName = (data.userName)? data.userName : '';
  data.firstName =(data.firstName) ? data.firstName : '';
  data.lastName =(data.lastName) ? data.lastName : '';

  if(validator.isEmpty(data.firstName)){
    errors.password = "firstName is required";
  }
  if(validator.isEmpty(data.lastName)) {
    errors.password = " lastName is required";
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }

};

