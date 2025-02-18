const JWT = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
    let newToken = token.slice(7);
    JWT.verify(newToken, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Failed to authenticate token.'
            })
        }

        req.user = decode.payload;
        return next();
    })
}

const authorizeRole = (req, res, next) => {
    if (req.user?.role != "admin") {
        return res.status(403).send({
            success: false,
            message: 'You are not authorized to access this resource'
        })
    }
    return next();

}

module.exports = {
    verifyToken, authorizeRole
}