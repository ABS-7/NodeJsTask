const express = require("express");
const bodyParser = require('body-parser');
const userController = require("../controllers/user");
const querystring = require('querystring');

let router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(express.json());

router.get("/registration", (req, res) => {
    res.render("registration", { message: null });
});

router.post("/registration", urlencodedParser, async(req, res) => {
    console.log('in post of registration');
    const result = await userController.doRegistration(req.body);
    if (result == "error") {
        res.render("registration", { message: "Email already taken pls register with other email" })
    } else { res.redirect("login"); }

});

router.get("/login", (req, res) => {
    res.render("login", { message: null });
});

router.post("/login", urlencodedParser, async(req, res) => {
    const match = await userController.matchLogin(req.body);
    if (match === "connot match email")
        res.render('login', { message: "connot match email pls register..." })
    if (match) {
        const userid = await userController.emailToId(req.body.userEmail);
        console.log(userid);
        const query = querystring.stringify({
            id: String(userid),
            login: true
        });
        res.redirect("/dashboard?" + query);
    } else res.render("login", { message: "connot match password pls write currect one..." });
});


router.get("/logout", (req, res) => {
    res.redirect('login');
})

module.exports = router;