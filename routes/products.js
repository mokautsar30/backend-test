const ProductController = require("../Controllers/productController");
const adminOnly = require("../middlewares/adminAuthorization")
const router = require("express").Router();

router.post("/", adminOnly, ProductController.addProduct);
router.get("/", ProductController.viewProduct);
router.get("/:id", ProductController.viewProductById);
router.put("/:id", adminOnly, ProductController.editProduct);
router.delete("/:id", adminOnly, ProductController.deleteProduct);

module.exports = router;
