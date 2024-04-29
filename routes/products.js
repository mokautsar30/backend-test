const ProductController = require("../Controllers/productController");
const adminOnly = require("../middlewares/adminAuthorization")
const router = require("express").Router();

router.post("/", adminOnly, ProductController.addProduct); //done
router.get("/", ProductController.viewProduct); //done
router.get("/:id", ProductController.viewProductById); // done
router.put("/:id", adminOnly, ProductController.editProduct); //done
router.delete("/:id", adminOnly, ProductController.deleteProduct); //done

module.exports = router;
