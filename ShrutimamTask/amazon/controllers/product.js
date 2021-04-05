const product = require("../models/productModel");
const user = require("../models/userModel");
const purchase = require("../models/purchaseModel");

async function getProducts() {
    try {
        const products = await product.find({ active: true });
        return products;
    } catch (error) {
        return "error";
    }
}

async function addProduct(data) {
    let userId;
    try {
        console.log(data.userEmail);
        userId = await user.findOne({ email: data.userEmail }).select({ "_id": 1 });
        console.log("userId" + userId);
    } catch (error) {
        console.log(error);
        return "error";
    }
    const validProduct = {
        name: data.productName,
        price: data.productPrice,
        addedBy: userId._id
    }
    try {
        console.log(validProduct);
        const result = await product.create(validProduct);
        //console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


async function getUserProducts(userEmail) {
    try {
        const userId = await user.findOne({ email: userEmail }).select({ _id: 1 });
        const userProducts = await product.find({ $and: [{ addedBy: userId._id }, { active: true }] });
        return userProducts;
    } catch (error) {
        return "error";
    }
}

async function editProduct(data) {
    console.log(data);
    try {
        const result = await product.updateOne({ _id: data.productId }, { name: data.productName, price: data.productPrice });
        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}

async function deleteProduct(data) {
    console.log(data);
    try {
        const result = await product.updateOne({ _id: data.productId }, { active: false });
        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}
async function productPurchase(data) {
    console.log(data);
    try {
        const userId = await user.findOne({ email: data.userEmail }).select({ _id: 1 });
        const userProducts = await product.updateOne({ _id: data.productId }, { active: false, purchased: true });
        console.log(userId._id + "====>" + data.productId);
        const result = await purchase.create({ productId: data.productId, purchasedBy: userId._id });
        return result
    } catch (error) {
        console.log(error);
        return 'error'
    }
}

module.exports = {
    getProducts: getProducts,
    addProduct: addProduct,
    getUserProducts: getUserProducts,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    productPurchase: productPurchase
}