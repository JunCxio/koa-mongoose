const router = require('koa-router')()

const LoginStrategy = require('../controller/user')

/**
 * 查询所有接口
 * @param page 页码
 * @param pageSize 页数
 */
router.post('/api/allUsers', LoginStrategy.findAll)

/**
 * 查找单个
 * @param id 用户ID
 */
router.post('/api/findOne', LoginStrategy.findOne)

/**
 * 新增
 */
router.post('/api/addUser', LoginStrategy.add)

/**
 * 删除
 * @param id 用户ID
 */
router.post('/api/deleteUser', LoginStrategy.deleteUser)

/**
 * 编辑
 */
router.post('/api/updata', LoginStrategy.updata)

module.exports = router
