const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.replace("Bearer ", "")
        if(!token) return res.json({message: "Provide Token", success: false})
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err) return res.json({message: "EerorError while verifying token", success: false})
            req.user = decoded
            next()
        })
    } catch (error) {
        console.log(error)
        return res.json({
            message: "Error while verfiying TOKEN",
            success: false
        })
    }
}

module.exports = verifyJWT