const express = require("express");
const dotenv = require('dotenv');

// setting prt from env or manually
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send("root");
});

const server = app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log("listen at=> " + server.address().address + " on port " + server.address().port);
});