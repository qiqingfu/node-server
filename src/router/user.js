const API = '/api/user'
const { loginIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const UserRouterHandler = async (req, res) => {
    const { method, path } = req
    // 用户登陆
    if (method === 'POST' && path === `${API}/login`) {
        const {username, password} = req.body
        /**
         * @param {object} userData
         * code: 1 success number
         * code: 0 error number
         * message string
         * data object
         */
        const userData = await loginIn({username, password})
        if (userData.code) {
            const {data=null, message} = userData
            res.setHeader('Set-Cookie', `username=${data.username}`)
            return new SuccessModel(data, message)
        } else {
            return new ErrorModel(userData.message)
        }
    }

    // 用户是否登陆测试
    // if (method === 'GET' && path === `${API}/login-test`) {
    //     if (req.cookie.username) {
    //         return Promise.resolve(new SuccessModel('你已登陆'))
    //     } else {
    //         return Promise.resolve(new ErrorModel('你未登陆'))
    //     }
    // }
}

module.exports = UserRouterHandler