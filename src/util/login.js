/**
 * 根据 session 信息验证用户是否登陆
 * @param {object} req
 * @return [Boolean, Promise]
 */
const { ErrorModel } = require('../model/resModel')

const isLogin = req => {
    if (req.session && req.session.username) return false
    return new Promise((resolve) => {
        resolve(new ErrorModel('你未登陆'))
    })
}

module.exports = {
    isLogin
}