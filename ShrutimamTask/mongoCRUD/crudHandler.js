const rifle = require("./rifleSchema");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();
const dbURL = process.env.dbURL;

async function perform(action, data) {

    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true }, (err) => {
        if (err) console.log(err);
    });

    switch (action) {
        case "c":
            try {
                result = await rifle.insertMany(data);
            } catch (error) {
                console.log(error);
            }
            break;
        case "r":
            try {
                result = await rifle.find(data);
            } catch (error) {
                console.log(error);
            }
            break;
        case "u":
            try {
                result = await rifle.updateMany(data.filter, { $set: data.updation });
            } catch (error) {
                console.log(error);
            }
            break;
        case "d":
            try {
                result = await rifle.updateMany(data.filter, { $set: { active: false } });
            } catch (error) {
                console.log(error);
            }
            break;
        default:
            console.log("cannot match action");
    }
    return result;
}

module.exports = {
    perform: perform
}