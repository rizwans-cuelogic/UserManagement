const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const result = require('dotenv').config();
// routers 
const users = require('./routes/users');
const backup = require('mongodb-backup');
const restore = require('mongodb-restore');
const http = require('http');
app = express();

const port = process.env.PORT;
var server = http.createServer(app).listen(port)
var io = require("socket.io")(server);

app.set('view engine', 'pug');
app.use(express.static('./public'));
// body praser midddleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// mogo db connection
const db = process.env.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`Error:${err}`));

app.use(passport.initialize());
require('./config/passport')(passport);

backup({
  uri: process.env.mongoURI,
  root: __dirname,
  callback: function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('finish');
    }
  }
});

restore({
  uri: process.env.mongoURI,
  root: __dirname + '/userManagement'
});

// app.use((req,res,next)=>{ 
//   let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//   console.log(req.headers);

//   next();
// })

// app routers
app.get('/', (req, res) => {
  res.render('index', {
    title: "this is pug example",
    message: "Hello there...",
    elements: ['apple', 'tomato', 'carrot']
  });
});
app.use('/api/users', users);

io.on("connection", function (socket) {
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  socket.emit("message", "Welcome to UserManagement");
});
console.log(`Server running on port ${port}`);