const fs = require('fs')
const path = require('path')

const GenNonDuplicateID = randomLength => {
    return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
}

// 记录系统日志、自定义日志、错误日志

const createWriteStreamFunc  = filename => {
    const fileNamePath = path.join(__dirname, '../', '../', 'log', filename)
    const createWriteStream = fs.createWriteStream(fileNamePath, {flags: 'a'})
    return createWriteStream
}

// 记录系统日志
const assertStream = createWriteStreamFunc('assert.txt')
const assertWriteFunc = assertContent => {
    assertStream.write(assertContent)
}

// 写入自定义日志
const eventStream = createWriteStreamFunc('event.txt')
const eventWriteFunc = eventContent => {
    eventStream.write(eventContent)
}

// 写入错误日志
const errorStream = createWriteStreamFunc('error.txt')
const errorWriteFunc = errorContent => {
    errorStream.write(errorContent)
}

module.exports = {
    GenNonDuplicateID,
    assertWriteFunc,
    eventWriteFunc,
    errorWriteFunc
}