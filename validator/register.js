const validator = require('validator');

const isEmpty =require('./is-Empty.js');


module.exports=function validateRegisterInput(data){
  console.log("Data....",data);
  
  let errors = {};


  data.userName = (data.userName)? data.userName : '';
  data.password = (data.password) ? data.password : '';
  data.confirmPassword = (data.confirmPassword) ? data.confirmPassword : '';
  data.firstName =(data.firstName) ? data.firstName : '';
  data.lastName =(data.lastName) ? data.lastName : '';


  if(validator.isEmpty(data.userName)){
    errors.userName = "name is required.";
  }
  if(!validator.isLength(data.userName,{min:4,max:12})){
    errors.userName="name should be 4 to 30 chars long";
  }
  if(validator.isEmpty(data.password)){
    errors.password = "Password is required";
  }
  if(validator.isEmpty(data.confirmPassword)) {
    errors.password = " Confrim Password is required";
  }
  if(!validator.isLength(data.password,{min:5,max:12})){
    errors.password = "Password shouldbe 5 to 12 chars long";
  } 
  if(!validator.equals(data.password,data.confirmPassword)){
    errors.confirmPassword = "Confrim password did not match with Password"; 
  }

  return {
    errors,
    isValid : isEmpty(errors)
  }

};

