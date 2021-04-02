const mongoose = require("mongoose");
//const dotenv = require('dotenv');

//dotenv.config();

const users = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    password: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
});

const userModel = new mongoose.model("user", users);

module.exports = userModel;