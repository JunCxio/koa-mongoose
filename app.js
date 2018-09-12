/**
 * 引入Koa
 */
const Koa = require('koa')
const app = new Koa()

const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://localhost:27017/test',
  err => {
    if (err) {
      console.log('数据库连接失败!')
    } else {
      console.log('数据库连接成功!')
    }
  }
)

//通过中间件bodyParser获取post提交的数据,ctx.request.body.
const bodyParser = require('koa-bodyparser')

const api = require('./route/router')

app.use(bodyParser())

app.use(api.routes())

app.listen(3022)
console.log('app started at port 3022...')
