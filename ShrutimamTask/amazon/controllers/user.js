const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const saltRounds = 10;

async function doRegistration(data, file) {
    console.log("in user controller");
    //const base64Data = fs.readFileSync(file.path).toString('base64');
    const ex = file.originalname.substr(file.originalname.lastIndexOf('.'));

    const validData = {
        name: data.userName,
        email: data.userEmail,
        img: {
            filename: data.userEmail + ex,
            contentType: ex,
            imgBase64: 'C:/Other/viitor cloud/taskOfNodeJS/ShrutimamTask/amazon/uploads/userImg/' + data.userEmail + ex,
        },
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

async function doRegistration2(data) {
    console.log("in user controller");
    //const base64Data = fs.readFileSync(file.path).toString('base64');
    require("fs").writeFileSync('C:/Other/viitor cloud/taskOfNodeJS/ShrutimamTask/amazon/uploads/userImg/' + data.userEmail + Date.now() + '.png', data.data, 'base64', function(err) {
        console.log(err);
    });
    const validData = {
        name: data.userName,
        email: data.userEmail,
        img: {
            filename: data.userEmail + Date.now() + '.png',
            contentType: 'image/png',
            imgBase64: 'C:/Other/viitor cloud/taskOfNodeJS/ShrutimamTask/amazon/uploads/userImg' + data.userEmail + Date.now() + '.png',
            //imgBase64: data.data
        },
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
        const userdata = await user.findOne({ _id: id });
        return userdata.email;
    } catch (error) {
        console.log(error);
        return 'error';
    }
}

async function fetchUserImg(id) {
    try {
        const userdata = await user.findOne({ _id: id });
        if (userdata.img) {
            return userdata.img;
        } else {
            return null;
        }

    } catch (error) {
        console.log(error);
        return 'error';
    }
}

module.exports = {
    doRegistration: doRegistration,
    matchLogin: matchLogin,
    emailToId: emailToId,
    idToEmail: idToEmail,
    fetchUserImg: fetchUserImg,
    doRegistration2: doRegistration2
}