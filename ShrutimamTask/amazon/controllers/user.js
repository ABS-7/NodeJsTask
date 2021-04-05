const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function doRegistration(data) {

    console.log("in user controller");
    const validData = {
        name: data.userName,
        email: data.userEmail,
        password: await bcrypt.hash(data.userPassword, saltRounds)
    }

    try {
        const result = await user.create(validData);
        return result;
    } catch (error) {
        console.log('error occured');
        return 'error';
    }
}


async function matchLogin(data) {

    try {
        let match;
        const result = await user.findOne({ email: data.userEmail });
        if (result != null) {
            match = await bcrypt.compare(data.userPassword, result.password);
            //console.log("pss match : " + match);
        } else match = "connot match email";
        return match;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    doRegistration: doRegistration,
    matchLogin: matchLogin,
}