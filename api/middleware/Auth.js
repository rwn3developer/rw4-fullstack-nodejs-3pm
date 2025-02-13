const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
    let newToken = token.slice(7);
    jwt.verify(newToken, 'rnw4', (err, decode) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Failed to authenticate token'
            })
        }
        req.user = decode?.payload
        return next();
    })

}
const checkAdmin = async (req, res, next) => {
    if (req.user?.role != "admin") {
        return res.status(403).send({
            success: false,
            message: "You are not an admin"
        })
    }
    return next();
}
module.exports = {
    verifyToken, checkAdmin
}