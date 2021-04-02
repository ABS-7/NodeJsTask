const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp-plugin');
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
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { collection: "Products" });


products.plugin(timestamp, {
    createdName: 'created_at', // default: 'createdAt'
    updatedName: 'updated_at', // default: 'updatedAt'
    disableCreated: false, // Disables the logging of the creation date
    disableUpdated: false // Disabled the loggin of the modification date
});

const productModel = new mongoose.model("product", products);

module.exports = productModel;