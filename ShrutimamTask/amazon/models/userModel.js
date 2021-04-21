const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');
//const dotenv = require('dotenv');

//dotenv.config();

const users = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        filename: String,
        contentType: String,
        imgBase64: String
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Carts",
    }],
    active: {
        type: Boolean,
        default: true
    }
}, { collection: "Users" });


users.plugin(timestamp, {
    disableCreated: false, // Disables the logging of the creation date
});

const userModel = new mongoose.model("Users", users);

module.exports = userModel;