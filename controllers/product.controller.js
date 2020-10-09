const productService = require("../services/product.service");

//get all products
const getPagedProducts = (req, res) => {
    const page = req.params.page;
    const productsPerPage = req.params.productsPerPage;

    productService.fetchProducts(req).then(pageObject => {
        const itemCount = pageObject.count;
        const pageCount = Math.ceil(itemCount / parseInt(productsPerPage));
        res.status(200).json({
            products: pageObject.rows,
            pageCount: pageCount,
            totalProducts: itemCount,
            currentPage: page,
            productsPerPage: productsPerPage,
            status: "Success",
            message: ""
        })
    })
}


//create a new product
const createProduct = function(req, res){
    productService.createProduct(req).then(product => {
        res.status(200).json({
            product: product,
            status: "Success",
            message: ""
        })
    })
}
//Get a single product
const getProduct = function(req, res){
    productService.getProduct(req).then(product => {
        res.status(200).json({
            product: product,
            status: "Success",
            message: ""
        })
    })
}

//Update a product
const editProduct = function(req, res){
    productService.editProduct(req).then(() => {
        res.status(200).json({
            status: "Success",
            message: ""
        })
    })
}

//Delete a product
const deleteProduct = function(req, res){
    productService.deleteProduct(req).then(() => {
        res.status(200).json({
            status: "Success",
            message: ""
        })
    })
}


module.exports = {
    getPagedProducts, createProduct, getProduct, editProduct, deleteProduct
}