const http = require('http')
const qs = require('querystring')
const BlogRouterHandler = require('./src/router/blog')
const UserRouterHandler = require('./src/router/user')
const getPostData = require('./src/util/getPostData')
const resolveCookie = require('./src/util/cookies')
const {
    GenNonDuplicateID, 
    assertWriteFunc
} = require('./src/util/index')
const responseConf = require('./src/config/response')
const { redis_get, redis_set } = require('./src/db/redis')
/**
 * 
 * @param {*请求对象} req 
 * @param {*响应对象} res
 * 主要用于开启一个服务,做一些相关配置 
 */

const createServerHandler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    // 记录日志
    // assertWriteFunc(`method=${req.method} ----- url=${req.url} ----- user-agent=${req.headers['user-agent']} ----- time=${Date.now()}; \r\r`)

    // 解析query
    req.query = qs.parse(req.url.split('?')[1])
    req.path = req.url.split('?')[0]

    // 解析cookie
    req.cookie = resolveCookie(req)

    /**
     * 解析session, 让客户端的 token对应 server中 session的数据
     * 避免信息泄漏
     */

    let isSetCookie = false
    let token = req.cookie.token || ''
    // token 不存在
    if (!token) {
        isSetCookie = true
        token = GenNonDuplicateID(30)
        redis_set(token, {})
    }
    req.sessionId = token

    // 从 redis获取 session数据
    const sessionData = await redis_get(req.sessionId)
    if (sessionData === null) {
        req.session = {}
    } else {
        req.session = sessionData
    }

    // 解析 post data的数据
    const postData = await getPostData(req)
    req.body = postData
    
    const blogData =  await BlogRouterHandler(req, res)
    if (blogData) {
        
        // 用户第一次访问的时候,返回一个唯一的标示
        if (isSetCookie) {
            res.setHeader('Set-Cookie', `token=${token};path=/;httpOnly;maxAge=${responseConf.maxAge}`)
        }
        res.end(JSON.stringify(blogData))
        return
    }

    const userData = await UserRouterHandler(req, res)
    if (userData) {
        if (isSetCookie) {
            res.setHeader('Set-Cookie', `token=${token};path=/;httpOnly;maxAge=${responseConf.maxAge}`)
        }
        res.end(JSON.stringify(userData))
        return
    }

    // 404
    res.setHeader('Content-Type', 'text/plain')
    res.statusCode = 404
    res.end(http.STATUS_CODES[404])
}

module.exports = createServerHandler