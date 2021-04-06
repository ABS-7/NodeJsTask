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

async function emailToId(email) {
    try {
        const userdata = await user.findOne({ email: email });
        return userdata._id;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

async function idToEmail(id) {
    try {
        console.log("idtoemail=>" + id);
        const userdata = await user.findOne({ _id: id });
        return userdata.email;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

module.exports = {
    doRegistration: doRegistration,
    matchLogin: matchLogin,
    emailToId: emailToId,
    idToEmail: idToEmail
}