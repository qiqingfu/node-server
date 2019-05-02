const API = '/api/blog'
const {
    getList,
    getDetails,
    setNewBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/**
* 处理路由相关的工作
* 不关心数据是怎么组合的
*/
const BlogRouterHandler = async (req, res) => {
    const { method, url } = req
    const path = url.split('?')[0]
    const id = req.query.id

    // 博客列表接口
    if (method === 'GET' && path === `${API}/list`) {
        const { author = '', keyword = '' } = req.query

        const blogData = await getList(author, keyword)
        return new SuccessModel(blogData)
    }

    // 获取博客内容
    if (method === 'GET' && path === `${API}/details`) {
        const blogDetailsData = getDetails(id)
        return new SuccessModel(blogDetailsData)
    }

    // 新增一篇博客
    if (method === 'POST' && path === `${API}/new`) {
        const data = setNewBlog(req.body)
        return new SuccessModel(data, '新增成功!')
    }

    // 更新一篇博客
    if (method === 'POST' && path === `${API}/update`) {
        const updateResult = updateBlog(id, req.body)
        if (updateResult) {
            return new SuccessModel('更新成功')
        } else {
            return new ErrorModel('更新失败')
        }
    }

    // 更删除一篇博客
    if (method === 'POST' && path === `${API}/delete`) {
        const deleteResult = deleteBlog(id)
        if (deleteResult) {
            return new SuccessModel('删除成功')
        } else {
            return new ErrorModel('删除失败')
        }
    }
}

module.exports = BlogRouterHandler