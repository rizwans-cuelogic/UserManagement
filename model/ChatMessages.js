const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "chats"
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  message: {
    type: string
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});
module.exports = Chat = mongoose.model("chats", ChatSchema);
