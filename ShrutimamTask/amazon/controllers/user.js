const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function doRegistration(data) {

    const validData = {
        name: data.userName,
        email: data.userEmail,
        password: await bcrypt.hash(data.userPassword, saltRounds)
    }

    try {
        const result = await user.create(validData);
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function matchLogin(data) {

    try {
        const result = await user.findOne({ email: data.userEmail });
        const match = await bcrypt.compare(data.userPassword, result.password);
        return match;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    doRegistration: doRegistration,
    matchLogin: matchLogin,
}