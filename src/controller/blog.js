/**
 * 主要根据传递的参数处理数据相关
 */

 /**
  * 
  * @param {string} author 
  * @param {string} keyword
  * @return Object 
  */
const {exec} = require('../db/mysql')

const getList = async (author, keyword) => {
    console.log(keyword)
    let sql = `select * from blogs where 1=1`
    if (author) {
        sql += ` and author='${author}'`
    }
    // 模糊查询关键字title、content
    if (keyword) {
        sql += ` and title like '%${keyword}%' or content like '%${keyword}%'`
    }
    sql += ` order by createtime desc`
    const resultData = await exec(sql)
    return resultData
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