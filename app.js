const http = require('http')
const BlogRouterHandler = require('./src/router/blog')
const UserRouterHandler = require('./src/router/user')

const createServerHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    
    // 获取接口数据
    const blogData = BlogRouterHandler(req, res)
    if (blogData) {
        res.end(JSON.stringify(blogData))
        return
    }

    const userData = UserRouterHandler(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }

    // 404
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 404
    res.end(http.STATUS_CODES[404])
}

module.exports = createServerHandler