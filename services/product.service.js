const db = require("../models/index");
const product = require("../models/product/product");
const category = require("../models/product/category");
const brand = require("../models/product/brand");
const productBrand = require("../models/product/productbrand");
const productCategory = require("../models/product/productcategory");

const brandModel = brand(db.sequelize, db.Sequelize.DataTypes);
const productModel = product(db.sequelize, db.Sequelize.DataTypes);
const categoryModel = category(db.sequelize, db.Sequelize.DataTypes);
const productBrandModel = productBrand(db.sequelize, db.Sequelize.DataTypes);
const productCategoryModel = productCategory(db.sequelize, db.Sequelize.DataTypes);

brandModel.associate({Product: productModel, ProductBrand: productBrandModel})
categoryModel.associate({Product: productModel, ProductCategory: productCategoryModel})
productModel.associate({
    Category: categoryModel, 
    ProductCategory: productCategoryModel,
    Brand: brandModel, 
    ProductBrand: productBrandModel 
});


// Fetch Product
const fetchProducts = function(req){
    let selectedCategory = req.params.category_slug; 
    let selectedBrand = req.params.brand_slug;
    let page = req.params.page;
    let productsPerPage = req.params.productsPerPage;

    let pageObject = null;

    if(selectedCategory === "all-categories" && selectedBrand === "all-brands"){
        pageObject = productModel.findAndCountAll({
            limit: productsPerPage,
            offset: ((page - 1) * productsPerPage),
            where: { isDeleted: false }
        });
    }

    if(selectedCategory !== "all-categories" && selectedBrand !== "all-brands"){
        pageObject = productModel.findAndCountAll({
            limit: productsPerPage,
            offset: ((page - 1) * productsPerPage),
            where: { isDeleted: false },
            include: [
                {model: brandModel, where: { slug: selectedBrand }},
                {model: categoryModel, where: { slug: selectedCategory }}
            ]
        });
    }

    if(selectedCategory === "all-categories" && selectedBrand !== "all-brands"){
        pageObject = productModel.findAndCountAll({
            limit: productsPerPage,
            offset: ((page - 1) * productsPerPage),
            where: { isDeleted: false },
            include: [
                {model: brandModel, where: { slug: selectedBrand }}
            ]
        });
    }

    if(selectedCategory !== "all-categories" && selectedBrand === "all-brands"){
        pageObject = productModel.findAndCountAll({
            limit: productsPerPage,
            offset: ((page - 1) * productsPerPage),
            where: { isDeleted: false },
            include: [
                {model: categoryModel, where: { slug: selectedCategory }}
            ]
        });
    }

    return pageObject;
}




// create a new product
const createProduct = function(req){
    const product = productModel.create({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords,
        sku: req.body.sku,
        model:req.body.model,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        imageUrl : req.body.imageUrl,
        isBestseller: req.body.isBestseller,
        isFeatured: req.body.isFeatured,
        quantity: req.body.quantity
    });
    return product;
}

// Edit an existing product
const editProduct = function(req){
    const product = productModel.update({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords
    },
    {
        where: { id: req.params.id }
    });

    return product;
}

// Get a single product
const getProduct = function(req){
    const product = productModel.findByPk(req.params.id);
    return product;
}

// Delete a single product
const deleteProduct = function(req){
    const product = productModel.update({isDeleted: true},
        {
            where: {id: req.params.id}
        });
    return product;
}


module.exports = {
    fetchProducts, getProduct, createProduct, editProduct, deleteProduct
};