const router = require('koa-router')()
const multer = require('koa-multer')
const LoginStrategy = require('../controller/user')
const Code = require('../controller/code')

/**
 * 注册
 * @param avatar 头像
 * @param userName 用户名
 * @param accountNum 账号
 * @param password 密码
 */
router.post('/api/register', LoginStrategy.register)

/**
 * 登录
 * @param accountNum 账号
 * @param password 密码
 */
router.post('/api/login', LoginStrategy.login)

/**
 * 获取验证码
 */
router.get('/api/code', Code.checkcode)

//配置koa-multer
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, 'avatar/')
  },
  //修改文件名称
  filename: function(req, file, cb) {
    console.log(file)
    var fileFormat = file.originalname.split('.')
    console.log(fileFormat)
    console.log(cb)
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

//加载配置
var upload = multer({ storage })

/**
 * 上传头像
 */
router.post('/api/upload', upload.single('avatar'), LoginStrategy.uploadAvatar)

module.exports = router
