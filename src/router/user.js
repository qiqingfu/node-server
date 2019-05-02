const API = '/api/user'
const { loginIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const UserRouterHandler = (req, res) => {
    const { method, url:path } = req
    
    // 用户登陆
    if (method === 'POST' && path === `${API}/login`) {
        const {username, password} = req.body
        const userData = loginIn({username, password})
        if (userData) {
            return new SuccessModel(userData, '登陆成功')
        }
        return new ErrorModel('登陆失败')
    }
}

module.exports = UserRouterHandler