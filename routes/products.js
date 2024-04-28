const ProductController = require("../Controllers/productController");

const router = require("express").Router();



router.post("/",ProductController.addProduct)
router.get("/",ProductController.viewProduct)
router.put("/:id",ProductController.editProduct)
router.delete("/:id",ProductController.deleteProduct)


module.exports = router