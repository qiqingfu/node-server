const API = '/api/blog'
const { getList, getDetails } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const getPostData = require('../util/getPostData')

/**
* 处理路由相关的工作
* 不关心数据是怎么组合的
*/
const BlogRouterHandler = (req, res) => {
    const { method, url } = req
    const path = url.split('?')[0]

    // 博客列表接口
    if (method === 'GET' && path === `${API}/list`) {
        const { author = '', keyword = '' } = req.query

        const blogData = getList(author, keyword)
        return new SuccessModel(blogData)
    }

    // 获取博客内容
    if (method === 'GET' && path === `${API}/details`) {
        const { id = '' } = req.query
        const blogDetailsData = getDetails(id)
        return new SuccessModel(blogDetailsData)
    }

    // 解析post请求的数据
    return getPostData(req).then(data => {
        req.body = data
        
        // 新增一篇博客
        if (method === 'POST' && path === `${API}/new`) {
            return {
                msg: '这是新增博客接口'
            }
        }

        // 更新一篇博客
        if (method === 'POST' && path === `${API}/update`) {
            return {
                msg: '这是更新博客接口'
            }
        }

        // 更删除一篇博客
        if (method === 'POST' && path === `${API}/delete`) {
            return {
                msg: '这是删除博客接口'
            }
        }
    })
}

module.exports = BlogRouterHandler