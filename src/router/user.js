const API = '/api/user'
const { loginIn } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const UserRouterHandler = async (req, res) => {
    const { method, url:path } = req
    
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
            return new SuccessModel(data, message)
        } else {
            return new ErrorModel(userData.message)
        }
    }
}

module.exports = UserRouterHandler