const validator = require('validator');

const isEmpty =require('./is-Empty.js');


module.exports=function validateRegisterInput(data){
  console.log("Dat....",data);
  let errors = {};
  data.username = (data.userName)? data.username : '';
  data.password = (data.password) ? data.password : '';
  data.firstname =(data.firstName) ? data.firstname : '';
  data.lastname =(data.lastName) ? data.lastname : '';


  if(validator.isEmpty(data.username)){
    errors.name = "name is required.";
  }
  if(!validator.isLength(data.username,{min:4,max:12})){
    errors.name="name should be 4 to 30 chars long";
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

