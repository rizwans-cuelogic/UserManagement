const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput= require('../validator/register');
const validateLoginInput = require('../validator/login');
exports.register= function (req, res){

  const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
      res.status(404).json({errors});
    }
      User.findOne({userName:req.body.username})
      .then(user=>{ 
        if(user){
          res.status(400).json({username:"userName Already Existed"});
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
    res.status(404).json({ errors });
  }

  userName = req.body.username;
  password= req.body.password;
  User.findOne({username})
    .then(user =>{
      if(!user){
         res.status(404).json("User Not Found");
      }
      bcrypt.compare(password,user.password)
      .then(isMatch =>{
          if(isMatch){
            //res.json(`User logged in`);
            const payload = { 
              id:user.id,
              userName:user.userName,
              }
            
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
            res.status(404).json({error:"email and password is incorrect."});
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

