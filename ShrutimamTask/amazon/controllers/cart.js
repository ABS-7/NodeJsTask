const cart = require("../models/cartModel");
const user = require("../models/userModel");
const product = require("../models/productModel");
const purchase = require("../models/purchaseModel");

async function addToCart(data) {
    const insertData = {
        productId: data.productId,
        productName: data.productName,
        productPrice: data.productPrice,
        totalPrice: data.productPrice * data.productQuantity,
        cartQty: data.productQuantity
    }
    try {
        const result = await cart.create(insertData);
        //console.log(result);
        const upadation = user.updateOne({ _id: data.id }, { $push: { cart: result._id } });
        return upadation
    } catch (error) {
        console.log(error);
        return "error";
    }
}

async function fetchData(id) {

    const data = await user.find({ _id: id }).populate({ path: "cart" });
    return data;

}


async function productPurchase(data) {
    try {
        const userProduct = await product.findOne({ _id: data.productId });

        if (userProduct.stock >= data.cartQty) {
            await product.updateOne({ _id: data.productId }, { stock: userProduct.stock - data.cartQty });

            await cart.findByIdAndDelete({ _id: data.cartId });

            const result = await purchase.create({
                productId: data.productId,
                purchasedBy: data.id,
                totalPrice: data.totalPrice,
                purchasedQuantity: data.cartQty
            });

            return result;
        } else {
            return "stock is not avalable";
        }

    } catch (error) {
        console.log(error);
        return 'error'
    }
}

async function editCart(data) {
    try {

        const result = await cart.updateOne({ _id: data.cartId }, {
            cartQty: data.productQuantity,
            totalPrice: data.productQuantity * data.productPrice
        });
        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}


async function buyall(id) {
    try {
        const data = await user.findOne({ _id: id }).populate({ path: "cart" });
        // console.log(data);
        let msg = 'sucess';
        for (let i = 0; i < data.cart.length; i++) {
            console.log(data.cart[i]);
            const userProduct = await product.findOne({ _id: data.cart[i].productId });
            if (userProduct.stock >= data.cart[i].cartQty) {
                await product.updateOne({ _id: data.cart[i].productId }, { stock: userProduct.stock - data.cart[i].cartQty });

                await cart.findByIdAndDelete({ _id: data.cart[i]._id });

                const result = await purchase.create({
                    productId: data.cart[i].productId,
                    purchasedBy: id,
                    totalPrice: data.cart[i].totalPrice,
                    purchasedQuantity: data.cart[i].cartQty
                });
            } else {
                msg = "stock is not avalable";
            }
        }
        return msg;
    } catch (error) {
        console.log(error);
        return 'error'
    }

}

async function deleteCart(data) {
    try {
        console.log(data);
        const result = cart.findByIdAndDelete({ _id: data.cartId });
        return result;
    } catch (error) {
        console.log(error);
        return 'error'
    }
}

module.exports = {
    addToCart: addToCart,
    fetchData: fetchData,
    productPurchase: productPurchase,
    editCart: editCart,
    buyall: buyall,
    deleteCart: deleteCart,
}