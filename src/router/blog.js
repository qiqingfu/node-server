const API = '/api/blog'
const {
    getList,
    getDetails,
    setNewBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { isLogin } = require('../util/login')

/**
* 处理路由相关的工作
* 不关心数据是怎么组合的
*/
const BlogRouterHandler = async (req, res) => {
    const { method, path, query:{id} } = req

    // 博客列表接口
    if (method === 'GET' && path === `${API}/list`) {
        const { author = '', keyword = '' } = req.query

        const blogData = await getList(author, keyword)
        return new SuccessModel(blogData)
    }

    // 获取博客内容
    if (method === 'GET' && path === `${API}/details`) {
        const blogDetailsData = await getDetails(id)
        return new SuccessModel(blogDetailsData)
    }

    // 新增一篇博客
    if (method === 'POST' && path === `${API}/new`) {
        const userIsLogin = isLogin(req)
        if (userIsLogin) return userIsLogin

        let author = req.session.username  // 假数据,应该根据登陆用户的token
        const data = await setNewBlog(req.body, author)
        return new SuccessModel(data, '新增成功!')
    }

    // 更新一篇博客
    if (method === 'POST' && path === `${API}/update`) {
        const userIsLogin = isLogin(req)
        if (userIsLogin) return userIsLogin

        const author = req.session.username
        const updateResult = await updateBlog(id, req.body, author)
        if (updateResult) {
            if (updateResult.changedRows > 0) {
                return new SuccessModel('更新成功')
            } else {
                return new ErrorModel('更新失败')
            }
        }
    }

    // 删除一篇博客
    if (method === 'POST' && path === `${API}/delete`) {
        const userIsLogin = isLogin(req)
        if (userIsLogin) return userIsLogin

        const author = req.session.username
        const deleteResult = await deleteBlog(id, author)
        if (deleteResult) {
            // 根据受影响的行数,判断是否删除成功
            if (deleteResult.affectedRows > 0) {
                return new SuccessModel('删除成功')
            } else {
                return new ErrorModel('删除失败')
            }
        }
    }
}

module.exports = BlogRouterHandler