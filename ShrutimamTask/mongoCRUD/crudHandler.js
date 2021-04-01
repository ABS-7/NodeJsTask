const rifle = require("./rifleSchema");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();
const dbURL = process.env.dbURL;

async function perform(action, data) {

    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true }, (err) => {
        if (err) console.log(err);
        else console.log("database connect sucessfully...");
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
        default:
            console.log("cannot match action");
    }
    return result;
}

module.exports = {
    perform: perform
}

// module.exports = {
//     perform: async(action, data) => {
//         mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true }, async(err) => {
//             if (err) console.log(err);
//             else console.log("database connect sucessfully...");

//             // console.log("qqqqqqq");
//             // let result = await trySwitch(action, data);
//             // console.log("wwwwwww");
//             switch (action) {
//                 case "c":
//                     try {
//                         console.log("qqqqqqq");
//                         result = await rifle.insertMany(data);
//                         console.log("sdbfksb" + result);
//                     } catch (error) {
//                         console.log(error);
//                     }
//                     break;
//                 default:
//                     console.log("cannot match action");
//             }
//             console.log("end perform");
//             return result;
//         });
//     }
// };