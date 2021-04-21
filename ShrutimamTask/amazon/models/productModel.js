const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
//const dotenv = require('dotenv');

//dotenv.config();

const products = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    img: {
        filename: String,
        contentType: String,
        imgBase64: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, { collection: "Products" });


products.plugin(timestamp, {
    disableCreated: false, // Disables the logging of the creation date
    disableUpdated: false // Disabled the loggin of the modification date
});

const productModel = new mongoose.model("Products", products);

module.exports = productModel;