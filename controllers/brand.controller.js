const brandService = require("../services/brand.service");

// get brands

const fetchBrands = function(req, res){
    brandService.fetchBrands(req).then(brands => {
        res.status(200).json({
            brands: brands,
            status: "success",
            message: ""
        });
    });
}

const getBrand = function(req, res){
    brandService.getBrand(req).then(brand => {
        res.status(200).json({
            brand: brand,
            status: "success",
            message: ""
        });
    });
}

const createBrand = function(req, res){
    console.log("CREATE>>>>>>>inside controller");
    brandService.createBrand(req).then(brand => {
        res.status(200).json({
            brand: brand,
            status: "success",
            message: ""
        });
    });
}

const editBrand = function(req, res){
    brandService.editBrand(req).then((brand) => {
        res.status(200).json({
            brand: brand,
            status: "success",
            message: ""
        });
    });
}

const deleteBrand = function(req, res){
    brandService.deleteBrand(req).then(() => {
        res.status(200).json({
            status: "success",
            message: ""
        });
    });
}

module.exports = {
    fetchBrands, getBrand, createBrand, editBrand, deleteBrand
};