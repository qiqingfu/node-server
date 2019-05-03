const redis = require('redis')
const assert = require('assert')
const { REDIS_CONFIG } = require('../config/db')

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)

client.on('error', err => {
    assert(err instanceof Error);
    assert(err instanceof redis.AbortError)
    assert(err instanceof redis.AggregateError)
})

client.on('ready', () => {
    console.log('redis client success.')
})

const redis_set = (key, val) => {
    if (val instanceof Object) {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print)
}

// 读取数据为异步操作,使用 Promise
const redis_get = key => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
            }
            try {
                val = JSON.parse(val)
            } catch(err) {
                resolve(val)
            }

            resolve(val)
        })
    })
}

const redis_del = key => {
    if (typeof key === 'string') {
        client.del(key)
        return
    }
    if (Array.isArray(key)) {
        client.del([...key])
    }
}

module.exports = {
    redis_get,
    redis_set,
    redis_del
}