const userModel = require('../models/user')
const uuid = require('uuid/v1')

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

//查找单个
let findOne = async (ctx, next) => {
  let id = ctx.request.body.id
  let result = await userModel.find({ id }, { _id: 0, __v: 0 })
  if (result) {
    ctx.body = { respCode: 10000000, data: result, repMessage: '查询成功!' }
  } else {
    ctx.body = { respCode: 10000000, data: [], repMessage: '查询失败!' }
  }
}

//增加
let add = async (ctx, next) => {
  try {
    let newMsg = {
      name: ctx.request.body.name,
      sex: ctx.request.body.sex,
      area: ctx.request.body.area || '-',
      mobile: ctx.request.body.mobile || '-',
      desc: ctx.request.body.desc || '-',
      id: uuid()
    }
    await userModel.create(newMsg, function(err, doc) {})
    ctx.body = { respCode: 10000000, data: newMsg, repMessage: '新增成功!' }
  } catch (e) {
    ctx.body = { respCode: 11000000, data: [], repMessage: '新增失败!' }
  }
}

//删除
let deleteUser = async (ctx, next) => {
  try {
    let id = ctx.request.body.id
    await userModel.remove({ id }).exec((err, doc) => {
      if (!err) {
        console.log(doc)
      }
    })
    ctx.body = { respCode: 10000000, repMessage: '删除成功!' }
  } catch (error) {
    ctx.body = { respCode: 10000000, repMessage: '删除失败!' }
  }
}

//编辑
let updata = async (ctx, next) => {
  try {
    let id = ctx.request.body.id
    let newMsg = {
      name: ctx.request.body.name,
      sex: ctx.request.body.sex,
      area: ctx.request.body.area || '-',
      mobile: ctx.request.body.mobile || '-',
      desc: ctx.request.body.desc || '-'
    }
    await userModel.update({ id }, newMsg, (err, raw) => {
      if (!err) {
        console.log(raw)
      }
    })
    ctx.body = { respCode: 10000000, repMessage: '编辑成功!' }
  } catch (error) {
    ctx.body = { respCode: 10000000, repMessage: '编辑失败!' }
  }
}

module.exports = {
  findAll,
  add,
  deleteUser,
  updata,
  findOne
}
