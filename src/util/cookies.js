const resolveCookie = req => {
    const cookie = req.headers['cookie'] || ''
    const resultCookie = {}
    if (cookie) {
        cookie.split('&').forEach(item => {
            if (!item) {
                return
            }
            const cookieArr = item.split('=')
            const key = cookieArr[0] 
            const value = cookieArr[1]
            resultCookie[key] = value
        })
    }

    return resultCookie
}

module.exports = resolveCookie