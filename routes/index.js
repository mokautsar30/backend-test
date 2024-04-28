const UserController = require("../Controllers/userController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.use(authentication);

router.use("/products", require("./products"));

module.exports = router;
