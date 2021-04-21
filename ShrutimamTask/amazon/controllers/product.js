const product = require("../models/productModel");
const purchase = require("../models/purchaseModel");
const fs = require("fs");

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

async function addProduct(data, file) {

    //const base64Data = fs.readFileSync(file.path).toString('base64');
    const ex = file.originalname.substr(file.originalname.lastIndexOf('.'));
    console.log(data.datestemp);
    const validProduct = {
        name: data.productName,
        price: data.productPrice,
        stock: data.productStock,
        addedBy: data.id,
        img: {
            filename: data.productName + '-' + data.datestemp + ex,
            contentType: ex,
            imgBase64: 'C:/Other/viitor cloud/taskOfNodeJS/ShrutimamTask/amazon/uploads/productImg/' + data.productName + '-' + data.datestemp + ex,
        }
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

async function editProduct(data, file) {
    console.log(data);
    try {
        const base64Data = fs.readFileSync(file.path).toString('base64');

        const result = await product.updateOne({ _id: data.productId }, {
            name: data.productName,
            price: data.productPrice,
            stock: data.productStock,
            img: {
                filename: file.filename,
                contentType: file.mimetype,
                imgBase64: base64Data
            }
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