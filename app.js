/**
 * 引入Koa
 */
const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const views = require('koa-views');
const static = require('koa-static');
const path = require('path');

//=====================================================================================================
/**
 * koa-static---静态资源
 */
const staticPath = './static';

app.use(static(path.join(__dirname, staticPath)));

//在网站中输入localhost:3022/a.jpg就能访问的到

//=====================================================================================================
/**
 * 使用模板引擎
 */
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
);

app.use(async ctx => {
  let title = 'Hello Man!';
  await ctx.render('index', { title });
});

//=====================================================================================================
/**
 * 连接mongodb
 */
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

//=====================================================================================================
/**
 * 解决跨越问题
 */
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

//=====================================================================================================
/**
 * 通过中间件bodyParser获取post提交的数据,ctx.request.body.
 */
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

//=====================================================================================================
/**
 * 使用koa-router
 */
const api = require('./route/router');

app.use(api.routes()).use(api.allowedMethods()); //api.allowMethods如果不使用对应的方法会报错

//=====================================================================================================

app.listen(3022);
console.log('app started at port 3022...');
