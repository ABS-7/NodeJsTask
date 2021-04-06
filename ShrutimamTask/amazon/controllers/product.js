const product = require("../models/productModel");
const user = require("../models/userModel");
const purchase = require("../models/purchaseModel");

async function getProducts() {
    try {
        const products = await product.find({ active: true }).populate({
            path: "addedBy",
            options: {
                sort: { "name": 1 }
            }
        });
        return products;
    } catch (error) {
        return "error";
    }
}

async function addProduct(data) {
    const validProduct = {
        name: data.productName,
        price: data.productPrice,
        stock: data.productStock,
        addedBy: data.id
    }
    try {
        const result = await product.create(validProduct);
        return result;
    } catch (error) {
        console.log(error);
        return "error";
    }
}


async function getUserProducts(userid) {
    try {
        const userProducts = await product.find({ $and: [{ addedBy: userid }, { active: true }] });
        return userProducts;
    } catch (error) {
        return "error";
    }
}

async function editProduct(data) {
    console.log(data);
    try {
        const result = await product.updateOne({ _id: data.productId }, {
            name: data.productName,
            price: data.productPrice,
            stock: data.productStock
        });
        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}

async function deleteProduct(data) {
    try {
        const result = await product.updateOne({ _id: data.productId }, { active: false });
        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}
async function productPurchase(data) {
    try {
        const userProduct = await product.findOne({ _id: data.productId });

        await product.updateOne({ _id: data.productId }, { stock: userProduct.stock - data.productQuantity });

        const result = await purchase.create({
            productId: data.productId,
            purchasedBy: data.id,
            totalPrice: userProduct.price * data.productQuantity,
            purchasedQuantity: data.productQuantity
        });

        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}

async function getHistory(id) {
    try {
        const purchases = await purchase.find({ purchasedBy: id }).populate({
            path: "productId"
        });
        return purchases;
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
    productPurchase: productPurchase,
    getHistory: getHistory
}