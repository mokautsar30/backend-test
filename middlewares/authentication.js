const {verifyToken} = require("../helpers/jwt")
const {User} = require('../models')

module.exports = async function authentication(req, res, next) {
    try {
        const {authorization} = req.headers

        if(!authorization) {
            throw {name: "ForbiddenAccess"}
        }

        const rawToken = authorization.split(" ");
        if(rawToken[0] !== "Bearer") {
            throw {name: "ForbiddenAccess"}
        }

        const result = verifyToken(rawToken[1])

        const user = await User.findByPk(result.id)
        if(!user) {
            throw {name: "ForbiddenAccess"}
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
}