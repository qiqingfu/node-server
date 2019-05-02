const createServerHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        name: 'zhangsan',
        age: 22,
        env: process.env.NODE_ENV
    }))
}

module.exports = createServerHandler