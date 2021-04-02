const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp-plugin');
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
}, { collection: "Users" });


users.plugin(timestamp, {
    createdName: 'created_at', // default: 'createdAt'
    disableCreated: false, // Disables the logging of the creation date
});



const userModel = new mongoose.model("user", users);

module.exports = userModel;