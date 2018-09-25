const commentModel = require('../models/comment')

//发表留言
let comment = async (ctx, next) => {
  try {
    let newMsg = {
      id: ctx.request.body.id,
      comment: ctx.request.body.comment,
      avatar: ctx.request.body.avatar,
      userName: ctx.request.body.userName
    }
    await commentModel.create(newMsg, function(err, doc) {})
    ctx.body = { respCode: 10000000, data: newMsg, repMessage: '发表成功!' }
  } catch (e) {
    ctx.body = { respCode: 11000000, data: [], repMessage: '发表失败!' }
  }
}

//获取留言
let getComment = async (ctx, next) => {
  let page = ctx.request.body.page
  let result = await commentModel
    .find(null, { _id: 0, __v: 0 })
    .sort({ _id: -1 })
    .limit(5)
    .skip((page - 1) * 5)
    .exec()
  let total = await commentModel
    .find(null, { _id: 0, __v: 0 })
    .count((err, count) => {
      return count
    })
  if (result) {
    ctx.body = {
      respCode: 10000000,
      data: result,
      repMessage: '查询成功!',
      total: total
    }
  } else {
    ctx.body = {
      respCode: 11000000,
      data: [],
      repMessage: '查询失败!',
      total: 0
    }
  }
}

module.exports = {
  comment,
  getComment
}
