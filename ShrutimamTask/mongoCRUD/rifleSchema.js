const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();
maxYear = process.env.maxYearOfRifleManufactur;
minYear = process.env.minYearOfRifleManufactur;

const rifle = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
    },
    year: {
        type: Number,
        max: maxYear,
        min: minYear
    },
    country: {
        type: String
    },
    cartridge: {
        type: [String],
        require: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const rifleModel = new mongoose.model("rifle", rifle);

module.exports = rifleModel;