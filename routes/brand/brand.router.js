const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/brand.controller");

router.get("/", brandController.fetchBrands);
router.post("/", brandController.createBrand);
router.get("/:id", brandController.getBrand);
router.put("/", brandController.editBrand);
router.delete("/:id", brandController.deleteBrand);




module.exports = router;