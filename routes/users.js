const express = require("express");
const router = express.Router();
const user_Controller = require("../controller/userController");
const chat_Controller = require("../controller/chatController");

const passport = require("passport");

router.get("/test", (req, res) =>
  res.json({
    msg: "ok"
  })
);

router.post("/users/register", user_Controller.register);

router.post("/users/authenticate", user_Controller.login);

router.get("logActivity", user_Controller.get_last_login);

router.get(
  "currentUser",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      msg: "success",
      user: req.user
    });
  }
);
router.get(
  "/users",
  passport.authenticate("jwt", {
    session: false
  }),
  user_Controller.all_users
);

router.get(
  ":userId",
  passport.authenticate("jwt", {
    session: false
  }),
  user_Controller.get_user
);

router.put(
  ":userId",
  passport.authenticate("jwt", {
    session: false
  }),
  user_Controller.update_user
);

router.post(
  "/chat",
  passport.authenticate("jwt", {
    session: false
  }),
  chat_Controller.insertChat
);

router.post("/message", passport.authenticate("jwt", {
  session: false
}), chat_Controller.insertMessage);

router.get("/chats", passport.authenticate("jwt", {
  session: false
}), chat_Controller.getChat);

router.get("/messages", passport.authenticate("jwt", {
  session: false
}), chat_Controller.getMessages);

module.exports = router;