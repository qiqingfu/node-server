/**
 * 数据库链接环境配置
 */
const env = process.env.NODE_ENV

let MYSQL_CONFIG

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        port: 3306,
        charset: 'utf8_general_ci',
        password: '123456',
        database: 'myblog',
        connectTimeout: 6000,
    }
}

// 链接线上
if (env === 'prod') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        port: 3306,
        charset: 'utf8_general_ci',
        password: '123456',
        database: 'myblog',
        connectTimeout: 6000,
    }
}

module.exports = {
    MYSQL_CONFIG
}