const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
//const dotenv = require('dotenv');

//dotenv.config();

const carts = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    cartQty: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { collection: "Carts" });


carts.plugin(timestamp, {
    disableCreated: false, // Disables the logging of the creation date
    disableUpdated: false // Disabled the loggin of the modification date
});

const cartModel = new mongoose.model("Carts", carts);

module.exports = cartModel;