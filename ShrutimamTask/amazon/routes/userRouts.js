const express = require("express");
const bodyParser = require('body-parser');
const userController = require("../controllers/user");

let router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/registration", (req, res) => {
    res.render("registration");
});

router.post("/registration", async(req, res) => {
    await userController.doRegistration(req.body);
    res.render("login");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", async(req, res) => {
    const match = await userController.matchLogin(req.body);
    if (match) res.send("secsess");
    else res.render("login");
});

module.exports = router;