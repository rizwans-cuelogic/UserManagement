const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  title: {
    type: string,
    required: true
  },
  createdBy: {
    type: string,
    required: true
  },
  chatWith: {
    type: string
  },
  isAccept: {
    type: boolean
  }
});
module.exports = Chat = mongoose.model("chats", ChatSchema);
