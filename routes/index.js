const UserController = require("../Controllers/userController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/login", UserController.login); //done
router.post("/register", UserController.register); //done

router.use(authentication);

router.use("/products", require("./products"));

module.exports = router;
