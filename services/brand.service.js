const db = require("../models/index");
const brand = require("../models/product/brand");
const brandModel = brand(db.sequelize, db.Sequelize.DataTypes);

//Fetch Brands
const fetchBrands = function(req){
    let brands = brandModel.findAll({ where: { isDeleted: false }});
    return brands;
}

//Fetch a single Brand
const getBrand = function(req){
    let brand = brandModel.findByPk(req.params.id);
    return brand;
}
//create Brand
const createBrand = function(req){
    console.log("CREATE>>>>>>>inside service");
    let brand = brandModel.create({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords
    });
    return brand;
}


//Edit Brand
const editBrand = function(req){
    let brand = brandModel.update({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords
    },{
        where: {id: req.params.id}
    });
    return brand;
}

//Delete a single Brand
const deleteBrand = function(req){
    let brand = brandModel.update({isDeleted: true}, { where: {id: req.params.id }});
    return brand;
}


module.exports = {
    fetchBrands,getBrand, createBrand, editBrand,deleteBrand
};