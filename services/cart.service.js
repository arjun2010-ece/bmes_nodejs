const { v4: uuidv4 } = require('uuid');
const db = require("../models/index");
const cart = require("../models/cart/cart");
const cartItem = require("../models/cart/cartitem");
const product = require("../models/product/product");

const cartModel = cart(db.sequelize, db.Sequelize.DataTypes);
const cartItemModel = cartItem(db.sequelize, db.Sequelize.DataTypes);
const productModel = product(db.sequelize, db.Sequelize.DataTypes);

// Associate the models
cartModel.associate({CartItem: cartItemModel});
cartItemModel.associate({Cart: cartModel, Product: productModel});


// Gets Unique Cart Id
const uniqueCartId = function(req){
    if(req.session.uniqueCartId){
        return req.session.uniqueCartId;
    }
    else{
        req.session.uniqueCartId = uuidv4();
        return req.session.uniqueCartId;
    }
}

// Get cart
const getCart = function(req){
    let uniqueId = uniqueCartId(req);
    let cart = cartModel.findOrCreate({
        where: { uniqueCartId: uniqueId }
    });
    return cart;
}
// Add to cart
const addToCart = function(req){
    const productId = parseInt(req.params.productId);
    return getCart(req).then(cart => {
        cartItemModel.findOne({
            where: { productId: productId, cartId: cart[0].id }
        }).then(cartItem => {
            if(cartItem){
                let qty = cartItem.quantity + 1 ;
                cartItemModel.update({ quantity: qty}, {
                    where: { productId: productId, cartId: cart[0].id }

                });
            } else{
                cartItemModel.create({
                    quantity: 1,
                    cartId: cart[0].id,
                    productId: productId
                });
            }
        })
    })
}

// Remove from cart
const removeFromCart = function(req){
    let cartItemId = parseInt(req.params.cartItemId);
    return cartItemModel.destroy({ where: { id: cartItemId }});
}


// Get cart Items
const getCartItems = function(req){
    return getCart(req).then(cart => {
        return cartItemModel.findAll({
            where: { cartId: cart[0].id },
            include: [
                { model: productModel }
            ]
        }).then(cartItems = > cartItems);
    })
}

// Cart Items count
const cartItemsCount = function(cartItems){
    let count = 0;
    if(cartItems.length){
        cartItems.forEach(item => {
            count += item.quantity;
        })
    }
    return count;
}
// Get Cart Total
const getCartTotal = function(cartItems){
    let total = 0;
    if(cartItems.length){
        cartItems.forEach(item => {
            total += item.quantity * item.Product.price;
        })
    }
    return total;
}

module.exports = {
    addToCart, 
    removeFromCart, 
    getCartItems, 
    cartItemsCount, 
    getCartTotal,
    getCart,
    uniqueCartId
}