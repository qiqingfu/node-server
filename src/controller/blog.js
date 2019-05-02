/**
 * 主要根据传递的参数处理数据相关
 */

 /**
  * 
  * @param {string} author 
  * @param {string} keyword
  * @return Object 
  */

const getList = (author, keyword) => {
    return [
        { 
            id: 1, 
            author: 'zhangsan', 
            title: 'title-1', 
            content: '内容1', 
            createTime: 1556775706158
        },
        { 
            id: 2, 
            author: 'lisi', 
            title: 'title-2', 
            content: '内容2', 
            createTime: 1556775730658
        }
    ]
}

/**
 * 
 * @param {number} id
 * @return Object 
 */
const getDetails = id => {
    return [
        {
            id: 1, 
            author: 'zhangsan', 
            title: 'title-1', 
            content: '内容1', 
            createTime: 1556775706158
        }
    ]
}

/**
 * 
 * @param {object} blogData
 * @return Object 
 */
const setNewBlog = blogData => {
    return {
        id: 4
    }
}

/**
 * 
 * @param {number} id 
 * @param {object} blogData
 * @return Boolean 
 */
const updateBlog = (id, blogData) => {
    return true
}

/**
 * 
 * @param {number} id
 * @return Boolean 
 */
const deleteBlog = id => {
    console.log(id, '删除博客的id')
    return true
}

module.exports = {
    getList,
    getDetails,
    setNewBlog,
    updateBlog,
    deleteBlog
}