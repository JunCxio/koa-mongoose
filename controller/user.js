const userModel = require('../models/user')
const uuid = require('uuid/v1')

//注册
let register = async (ctx, next) => {
  try {
    let newMsg = {
      avatar: ctx.request.body.avatar,
      userName: ctx.request.body.userName,
      accountNum: ctx.request.body.accountNum,
      password: ctx.request.body.password,
      id: uuid()
    }
    await userModel.create(newMsg, function(err, doc) {})
    ctx.body = { respCode: 10000000, data: newMsg, repMessage: '注册成功!' }
  } catch (e) {
    ctx.body = { respCode: 11000000, data: [], repMessage: '注册失败!' }
  }
}

//登录
let login = async (ctx, next) => {
  let accountNum = ctx.request.body.accountNum
  let password = ctx.request.body.password
  let result = await userModel.find({ accountNum }, { _id: 0, __v: 0 })
  if (result && result.length && result[0].password == password) {
    ctx.body = { respCode: 10000000, data: result, repMessage: '登录成功!' }
  } else {
    ctx.body = { respCode: 11000000, data: [], repMessage: '用户名或密码错误!' }
  }
}

//查询所有
let findAll = async (ctx, next) => {
  let pageSize = ctx.request.body.pageSize
  let page = ctx.request.body.page
  let result = await userModel
    .find(null, { _id: 0, __v: 0 })
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .exec()
  let total = await userModel
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

//获取头像
let uploadAvatar = async (ctx, next) => {
  ctx.body = {
    filename: ctx.req.file.filename //返回文件名
  }
}

module.exports = {
  register,
  login,
  uploadAvatar
}
