const mongoose = require('mongoose')
const Schema = mongoose.Schema

//定义评论Schema
const commentSchema = new Schema({
  id: { type: String, required: true },
  avatar: { type: String, required: true },
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  commentTime: { type: Number, default: Date.now } //获取时间戳,
})

const comment = mongoose.model('message', commentSchema)

module.exports = comment
