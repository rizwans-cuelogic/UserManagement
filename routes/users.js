const express = require('express');
const router = express.Router();
const user_Controller = require('../controller/userController');
const passport = require('passport');

router.get('/test',(req,res) => res.json({msg :"ok"}));

router.post('/register',user_Controller.register);

router.post('/login',user_Controller.login);

router.get('/logActivity',user_Controller.get_last_login);

router.get('/currentUser',passport.authenticate('jwt',
                          {session:false }),(req,res)=>{
                            res.json({msg:'success',user:req.user});
                          });
router.get('/',
  passport.authenticate('jwt',{session:false}),
  user_Controller.all_users);

router.get('/:userId',
  passport.authenticate('jwt',{session:false}),
  user_Controller.get_user);

router.put('/:userId',
  passport.authenticate('jwt',{session:false}),
  user_Controller.update_user
);

module.exports=router;
