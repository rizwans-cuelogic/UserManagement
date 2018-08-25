const User = require('../model/User');
const UserActivity = require('../model/UserActivity');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const boom = require('boom');


const validateRegisterInput= require('../validator/register');
const validateLoginInput = require('../validator/login');
const validateUpdateUserInput = require('../validator/userUpdate')

exports.register= function (req, res){

  const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
      res.status(404).json({errors});
    }
    User.findOne({userName:req.body.userName})
      .then(user=>{ 
        if(user){
          res.json(boom.badRequest('user already exists.'));
        }
        else{ 
            const newUser = new User({
              userName:req.body.userName,
              password:req.body.password,
              firstName:req.body.firstName,
              lastName : req.body.lastName
            })
          bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err){ throw err;}
              newUser.password=hash;
              newUser.save().then(user =>{ res.json(user)})
              .catch(err => { console.log(err)});
            })
          })  
        }

    })
    .catch(err => { console.log(err)});
};
exports.login =  function (req,res){
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }

  userName = req.body.userName;
  password= req.body.password;
  User.findOne({userName})
    .then(user =>{
      if(!user){
         res.json(boom.notFound());
      }
      bcrypt.compare(password,user.password)
      .then(isMatch =>{
          if(isMatch){
            //res.json(`User logged in`);
            const payload = { 
              id:user.id,
              userName:user.userName,
              }
            let user_agent = req.header.user_agent;
            let host = req.headers.host;
            
            const useractivity = new UserActivity(
              {
                user : user.id,
                ip : host,
                uaString : user_agent
              }
            )
            useractivity.save().then(useractivity =>{
              console.log("logged user activity");
            })

            jwt.sign(payload,process.env.secretorkey,
              {expiresIn:3600},
              (err,token)=>{
            
              res.json({
                success:true,
                token : 'Bearer '+token
              });
            });
          }
          else{
            res.json(boom.badData());
          }
      })
      .catch(err =>{
        console.log(err);
      });

    })
    .catch(err =>{
      console.log(err);
    });
};

exports.all_users = function(req,res){
   User.find().then(users => {
      res.json(users);
   })
  .catch(err => console.log(err)); 
}
exports.get_user = function(req,res){
  let userId = req.params.userId;
  User.findOne({_id:userId})
  .then(user =>{ 
      if(!user){
        res.json(boom.notFound());
      }
      else{
        res.json(user);
      }
  })
  .catch(err =>{
    console.log(err);
  }) 
}
exports.update_user = function(req,res){
  const { errors, isValid } = validateUpdateUserInput(req.body);
  if(!isValid){
    res.status(404).json({errors});
  }

  const userFields = {}
  userFields.firstName = req.body.firstName,
  userFields.lastName = req.body.lastName, 
  userFields.date = Date.now();

  User.findOne({_id:req.params.userId}).then(user =>{
    if(user)
    {
      User.findOneAndUpdate(
        {_id : req.params.userId},
        {$set : userFields },
        {new : true}
      ).then( user => res.json(user))
      .catch(err => console.log(err));
    }
    else{
      res.json(boom.notFound());

    }

  })
}
exports.get_last_login = function(req,res){
  const query = UserActivity.find();
  const days_login = moment().add(-process.env.LOGIN_LIMIT,'days');
  UserActivity.find({'date':{"$gte":days_login}}).sort({'date':-1})
  .then(useractivities => {
    if(useractivities)
      res.json(useractivities);
    else{
      res.json(boom.notFound());
    }
  })

}