/**
 * 主要根据传递的参数处理数据相关
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

module.exports = {
    getList,
    getDetails
}