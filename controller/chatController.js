const Chat = require("../model/Chat");
const UserActivity = require("../model/UserActivity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const boom = require("boom");

exports.insertChat = function(req, res) {
  Chat.findOne({ title: req.body.title }).then(chat => {
    if (!chat) {
      const Chat = new Chat({
        title: req.body.title,
        createdBy: req.user.id,
        chatWith: req.body.chatWith,
        isAccept: false
      });
      Chat.save().then(chat => {
        res.status(200).json("created chat successfully");
      });
    }
  });
};

exports.acceptChat = function(req, res) {
  Chat.find({ chatWith: req.user.id, isAccept: false }).then(chat => {
    if (chat) {
      let chatFields = {
        isAccpet: true
      };
      Chat.findOneAndUpdate({
        _id: chat.id,
        $set: chatFields,
        new: true
      });
      res.status(200).json("Chat Accepted");
    } else {
      res.status(404).json("Chat not found");
    }
  });
};
