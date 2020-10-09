const db = require("../models/index");
const category = require("../models/product/category");
const categoryModel = category(db.sequelize, db.Sequelize.DataTypes);


// Fetch categories
const fetchCategories = function(req){
    const categories = categoryModel.findAll({ where: { isDeleted: false }});
    return categories;
}

// Fetch a single category
const fetchCategory = function(req){
    const category = categoryModel.findByPk(req.params.id);
    return category;
}

// create a new category
const createCategory = function(req){
    const category = categoryModel.create({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords,
    });
    return category;
}

// update an existing category
const editCategory = function(req){
    const category = categoryModel.update({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords,
    },
    {
        where: { id: req.params.id}
    });
    return category;
}

// soft delete an existing category
const deleteCategory = function(req){
    const category = categoryModel.update({ isDeleted: true},
    {
        where: { id: req.params.id}
    });
    return category;
}

module.exports = {
    fetchCategories, fetchCategory, createCategory, editCategory, deleteCategory
};