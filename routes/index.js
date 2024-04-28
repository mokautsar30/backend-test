const UserController = require("../Controllers/userController");

const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("Hello World!!!");
  });


router.post("/login", UserController.login);
router.post("/register", UserController.register);


router.use("/products", require("./products"));

module.exports = router;
