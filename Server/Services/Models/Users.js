const { Schema, model } = require('mongoose')



const UserSchema = new Schema({
  name: String,
  lastName: String,
  userName: {
    type: String,
    unique: true
  },
  age: Number,
  activeTime: Boolean,
  password: {
    type: String,
    required: true
  }
})


const UserModel = model('users', UserSchema)
module.exports = UserModel