const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');

//const dotenv = require('dotenv');

//dotenv.config();

const purchases = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    purchasedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        require: true
    },
    purchasedQuantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { collection: "Purchases" });

purchases.plugin(timestamp, {
    disableCreated: false, // Disables the logging of the creation date
});


const purchaseModel = new mongoose.model("Purchases", purchases);

module.exports = purchaseModel;