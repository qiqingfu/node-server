// 主要处理用户登陆相关的数据

const loginIn = data => {
    const {username, password} = data
    if (username === 'qiqingfu' && password === '123456') {
        return {
            token: 'abcd'
        }
    }
    return false
}

module.exports = {
    loginIn
}