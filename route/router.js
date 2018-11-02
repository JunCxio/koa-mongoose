const Router = require('koa-router');
const multer = require('koa-multer');
const LoginStrategy = require('../controller/user');
const Code = require('../controller/code');
const Message = require('../controller/comment');

const router = new Router({
  // prefix: '/ljh'//层级,请求前不加会报错
});

/**
 * 注册
 * @param avatar 头像
 * @param userName 用户名
 * @param accountNum 账号
 * @param password 密码
 */
router.post('/api/register', LoginStrategy.register);

/**
 * 登录
 * @param accountNum 账号
 * @param password 密码
 */
router.post('/api/login', LoginStrategy.login);

/**
 * 获取验证码
 */
router.get('/api/code', Code.checkcode);

//配置koa-multer
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, 'avatar/');
  },
  //修改文件名称
  filename: function(req, file, cb) {
    console.log(file);
    var fileFormat = file.originalname.split('.');
    console.log(fileFormat);
    console.log(cb);
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  }
});

//加载配置
var upload = multer({ storage });

/**
 * 上传头像
 */
router.post('/api/upload', upload.single('avatar'), LoginStrategy.uploadAvatar);

/**
 * 发表评论
 */
router.post('/api/comment', Message.comment);

/**
 * 获取全部评论
 */
router.post('/api/commentList', Message.getComment);

module.exports = router;

//====================================================================================================
// /**
//  * 子路由
//  */
// let home = new router();
// home
//   .get('/jspang', async ctx => {
//     ctx.body = 'home JSpang page';
//   })
//   .get('/todo', async ctx => {
//     ctx.body = 'Home toDo Page';
//   });

// let page = new router();
// page
//   .get('/jspang', async ctx => {
//     ctx.body = 'page JSpang page';
//   })
//   .get('/todo', async ctx => {
//     ctx.body = 'Page toDo Page';
//   });

// /**
//  * 父路由
//  */
// let router = new router();
// router.use('/home', home.routes(), home.allowdMethods());
// router.use('/page', page.routes(), page.allowdMethods());

// app.use(router.routes()).use(router.allowdMethods());

//====================================================================================================
