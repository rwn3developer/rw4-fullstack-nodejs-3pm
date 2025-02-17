const loginUser = async (req, res) => {
    try {
        return res.send(req.body)
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}

module.exports = {
    loginUser
}