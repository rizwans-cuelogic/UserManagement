const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const result = require('dotenv').config();
// routers 
const users = require('./routes/users');
const backup = require('mongodb-backup');
const restore = require('mongodb-restore');

app = express();

// body praser midddleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// mogo db connection
const db = process.env.mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true } )
  .then(()=>console.log("DB connected"))
  .catch((err)=>console.log(`Error:${err}`));

app.use(passport.initialize());
require('./config/passport')(passport);

backup({
  uri: process.env.mongoURI,
  root: __dirname,
  callback: function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('finish');
    }
  }
});

restore({
  uri: process.env.mongoURI,
  root: __dirname+'/userManagement'
});

app.use((req,res,next)=>{ 
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.headers);

  next();
})

// app routers
app.use('/api/users',users);

const port=process.env.PORT;

app.listen(port,()=>{console.log(`Server running on port ${port}`)});