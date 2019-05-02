const http = require('http')
const qs = require('querystring')
const BlogRouterHandler = require('./src/router/blog')
const UserRouterHandler = require('./src/router/user')
const getPostData = require('./src/util/getPostData')
/**
 * 
 * @param {*请求对象} req 
 * @param {*响应对象} res
 * 主要用于开启一个服务,做一些相关配置 
 */
const createServerHandler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    // 解析query
    req.query = qs.parse(req.url.split('?')[1])

    // 解析 post data的数据
    const postData = await getPostData(req)
    req.body = postData
    
    const blogData =  await BlogRouterHandler(req, res)
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