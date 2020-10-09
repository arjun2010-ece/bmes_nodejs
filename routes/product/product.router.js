const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");

router.get("/:category_slug/:brand_slug/:page/:productsPerPage", productController.getPagedProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProduct);
router.put("/", productController.editProduct);
router.delete("/:id", productController.deleteProduct);




module.exports = router;