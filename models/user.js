const mongoose = require('mongoose')
const Schema = mongoose.Schema

//定义用户Schema
const userSchema = new Schema({
  avatar: {
    type: String
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  accountNum: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  modifyTime: { type: Number, default: Date.now }, //获取时间戳
  id: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
