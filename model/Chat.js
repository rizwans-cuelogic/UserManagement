const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  chatWith: {
    type: String
  },
  isAccept: {
    type: Boolean
  }
});
module.exports = Chat = mongoose.model("chats", ChatSchema);