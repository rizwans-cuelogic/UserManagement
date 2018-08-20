const express = require('express');
const router = express.Router();
const user_Controller = require('../controller/userController');
const passport = require('passport');

router.get('/test',(req,res) => res.json({msg :"ok"}));
router.post('/register',user_Controller.register);
router.post('/login',user_Controller.login);
router.get('/currentUser',passport.authenticate('jwt',
                          {session:false }),(req,res)=>{
                            res.json({msg:'success',user:req.user});
                          });
module.exports=router;
