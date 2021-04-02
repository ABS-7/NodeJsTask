const mongoose = require("mongoose");
//const dotenv = require('dotenv');

//dotenv.config();

const purchases = new mongoose.Schema({

    productName: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    }],
    purchasedDate: {
        type: Date,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    purchasedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
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

const purchaseModel = new mongoose.model("purchase", purchases);

module.exports = purchaseModel;