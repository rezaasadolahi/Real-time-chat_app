const { Schema, model } = require('mongoose')


const MessageSchema = new Schema({
  text: String,
  time: String,
  fromUser: String,
  toUser: String
})


const MessageModel = model('messages', MessageSchema)
module.exports = MessageModel