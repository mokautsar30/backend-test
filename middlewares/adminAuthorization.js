module.exports = function adminOnly(req,res,next) {
    try {
        if(req.user.role === "admin") {
            next()
        } else {
            throw {name: "ForbiddenAccess"}
        }
    } catch (error) {
        console.log(error);
    }
}