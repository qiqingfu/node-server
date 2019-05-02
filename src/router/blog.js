const API = '/api/blog'

const BlogRouterHandler = (req, res) => {
    const { method, url:path } = req
    
    // 博客列表接口
    if (method === 'GET' && path === `${API}/list`) {
        return {
            msg: '这是博客列表接口'
        }
    }

    // 获取博客内容
    if (method === 'GET' && path === `${API}/details`) {
        return {
            msg: '这是博客详情接口'
        }
    }

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
}

module.exports = BlogRouterHandler