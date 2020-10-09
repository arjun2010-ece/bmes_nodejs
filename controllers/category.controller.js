const categoryService = require("../services/category.service");

// get brands

const fetchCategories = function(req, res){
    categoryService.fetchCategories(req).then(categories => {
        res.status(200).json({
            categories: categories,
            status: "success",
            message: ""
        });
    });
}

const fetchCategory = function(req, res){
    categoryService.fetchCategory(req).then(category => {
        res.status(200).json({
            category: category,
            status: "success",
            message: ""
        });
    });
}

const createCategory = function(req, res){
    categoryService.createCategory(req).then(category => {
        res.status(200).json({
            category: category,
            status: "success",
            message: ""
        });
    });
}

const editCategory = function(req, res){
    categoryService.editCategory(req).then((category) => {
        res.status(200).json({
            category: category,
            status: "success",
            message: ""
        });
    });
}

const deleteCategory = function(req, res){
    categoryService.deleteCategory(req).then(() => {
        res.status(200).json({
            status: "success",
            message: ""
        });
    });
}

module.exports = {
    fetchCategories, fetchCategory, createCategory, editCategory, deleteCategory
};