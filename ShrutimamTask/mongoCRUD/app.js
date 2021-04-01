const express = require("express");
const dotenv = require('dotenv');
const crud = require("./crudHandler")

// setting prt from env or manually
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome Home");
});

app.post("/create", (req, res) => {
    crud.perform('c', req.body).then((result) => { res.json(result); });
});

app.get("/read", (req, res) => {});

app.put("/update", (req, res) => {});

app.post("/delete", (req, res) => {});

const server = app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log("listen at => " + server.address().address + " on port " + server.address().port);
});