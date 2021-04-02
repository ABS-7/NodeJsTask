const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp-plugin');

//const dotenv = require('dotenv');

//dotenv.config();

const purchases = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
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
    purchasedquantity: {
        type: Number,
        required: true
    },
});

purchases.plugin(timestamp, {
    createdName: 'created_at', // default: 'createdAt'
    disableCreated: false, // Disables the logging of the creation date
});


const purchaseModel = new mongoose.model("purchase", purchases);

module.exports = purchaseModel;