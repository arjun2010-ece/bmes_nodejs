const brandRoutes = require("./brand/brand.router");
const categoryRoutes = require("./category/category.router");
const productRoutes = require("./product/product.router");

const register = function(app){
    app.use("/api/brand", brandRoutes)
    app.use("/api/category", categoryRoutes)
    app.use("/api/product", productRoutes)
}

module.exports = register;