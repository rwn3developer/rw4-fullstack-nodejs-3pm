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
//role base authentication 
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req?.user?.role)) {
            return res.status(403).send({
                success: false,
                message: 'You are not authorized to access this resource'
            })
        }
        return next();
    }
}

module.exports = {
    verifyToken, authorizeRole
}