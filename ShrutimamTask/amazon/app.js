require("dotenv").config();
const express = require("express");
const user = require("./routes/userRouts");
const dashboard = require("./routes/dashboardRouts");
require("./db/connectDb");
const cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();

app.set("views", "views");
app.set('view engine', 'ejs');


app.use(cors());
app.use(express.static('uploads'));
app.use("/user", user);

app.use("/dashboard", dashboard);

app.get("/", (req, res) => {
    res.redirect("/user/login");
});

const server = app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log("listen on ==> " + server.address().address + " " + server.address().port);
    }
});