module.exports = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Expose-Headers', 'Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
}