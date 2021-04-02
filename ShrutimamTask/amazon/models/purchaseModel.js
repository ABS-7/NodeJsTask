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
}, { collection: "Purchases" });

purchases.plugin(timestamp, {
    disableCreated: false, // Disables the logging of the creation date
});


const purchaseModel = new mongoose.model("Purchases", purchases);

module.exports = purchaseModel;