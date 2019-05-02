const API = '/api/user'
const UserRouterHandler = (req, res) => {
    const { method, url:path } = req
    
    // 用户登陆
    if (method === 'POST' && path === `${API}/login`) {
        return {
            msg: '这是用户登陆的接口'
        }
    }
}

module.exports = UserRouterHandler