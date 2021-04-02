const mongoose = require("mongoose");
//const dotenv = require('dotenv');

//dotenv.config();

const products = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    importDate: {
        type: Date,
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
});

const productModel = new mongoose.model("product", products);

module.exports = productModel;