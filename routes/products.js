const ProductController = require("../Controllers/productController");
const adminOnly = require("../middlewares/adminAuthorization")
const router = require("express").Router();

router.post("/", adminOnly, ProductController.addProduct);
router.get("/", ProductController.viewProduct);
router.put("/:id", ProductController.editProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
