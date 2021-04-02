require("dotenv").config();
const express = require("express");
const user = require("./routes/userRouts");
require("./db/connectDb");

const port = process.env.PORT || 3000;

const app = express();

app.set("views", "views");
app.set('view engine', 'ejs');

app.use("/user", user);

app.get("/", (req, res) => {
    res.redirect("/user/login");
});

const server = app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log("listen on ==> " + server.address().address + " " + server.address().port);
    }
});