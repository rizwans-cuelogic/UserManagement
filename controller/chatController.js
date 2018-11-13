const Chat = require("../model/Chat");
const Message = require("../model/ChatMessages");
const UserActivity = require("../model/UserActivity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const boom = require("boom");

exports.insertChat = function (req, res) {
  Chat.findOne({
    title: req.body.title
  }).then(chat => {
    if (!chat) {
      const ChatObj = new Chat({
        title: req.body.title,
        createdBy: req.user.id,
        chatWith: req.body.chatWith,
        isAccept: false
      });
      ChatObj.save().then(chat => {
        res.status(200).json("created chat successfully");
      });
    }
  });
};

exports.acceptChat = function (req, res) {
  Chat.find({
    chatWith: req.user.id,
    isAccept: false
  }).then(chat => {
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

exports.insertMessage = function (req, res) {
  let message = new Message({
    sender: req.body.sender,
    chat: req.body.chat,
    message: req.body.message,
    timestamp: new Date()
  });
  message.save().then(chat => {
    res.status(200).json("message saved successfully");
  });
}

exports.getChat = function (req, res) {
  Chat.find({
      $or: [{
        createdBy: req.user.id
      }, {
        chatWith: req.user.id
      }]
    })
    .then(chats => {
      res.status(200).json(chats);
    })
}

exports.getMessages = function (req, res) {
  Message.find({
    sender: req.user.id
  }).then(messages => {
    res.status(200).json(messages);
  })
}