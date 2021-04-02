const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

dbURL = process.env.dbURL || "mongodb://localhost:27017/amazondb";

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => { console.log("db connect sucessfully..."); }).catch((err) => console.log(err));