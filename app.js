/**
 * 引入Koa
 */
const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/Demo',
  err => {
    if (err) {
      console.log('数据库连接失败!');
    } else {
      console.log('数据库连接成功!');
    }
  }
);

//解决跨越问题
app.use(
  cors({
    // origin: function(ctx) {
    //   // if (ctx.url === '*') {
    //   //   return '*' // 允许来自所有域名请求
    //   // }
    //   return 'http://localhost:3022'
    // },
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 3600,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'x-requested-with'
    ]
  })
);

//通过中间件bodyParser获取post提交的数据,ctx.request.body.
const bodyParser = require('koa-bodyparser');

const api = require('./route/router');

app.use(bodyParser());

app.use(api.routes().use(api.allowMethods())); //api.allowMethods如果不使用对应的方法会报错

app.listen(3022);
console.log('app started at port 3022...');
