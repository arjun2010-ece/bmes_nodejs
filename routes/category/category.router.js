const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category.controller");

router.get("/", categoryController.fetchCategories);
router.post("/", categoryController.createCategory);
router.get("/:id", categoryController.fetchCategory);
router.put("/", categoryController.editCategory);
router.delete("/:id", categoryController.deleteCategory);




module.exports = router;