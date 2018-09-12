const mongoose = require('mongoose')
const Schema = mongoose.Schema

//定义Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sex: { type: String, required: true },
  area: String,
  mobile: String,
  desc: String,
  modifyTime: { type: Number, default: Date.now }, //获取时间戳
  id: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
