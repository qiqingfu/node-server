/**
 * 获取 POST的数据
 */
 const getPostData = req => {
     return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let chunkData = ''
        req.on('data', chunk => {
            chunkData += chunk
        })
        req.on('end', () => {
            if (!chunkData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(chunkData)
            )
        })
     })
 }

 module.exports = getPostData