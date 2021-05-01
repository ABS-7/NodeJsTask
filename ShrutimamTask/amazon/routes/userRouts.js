const express = require("express");
const bodyParser = require('body-parser');
const userController = require("../controllers/user");
const querystring = require('querystring');
const store = require("../middleware/multer");
const jwt = require('jsonwebtoken');
const { registrationValidation, loginValidation } = require('../middleware/validation');

let router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(express.json({ limit: "500kb" }));

router.get("/registration", (req, res) => {
    res.render("registration", { message: null });
});



router.post("/registration", urlencodedParser, store.UserStore.single("userImg"), registrationValidation, async (req, res) => {

    // console.log('file:', req.file);
    //console.log('body:', req.body);
    // console.log(req.header)
    const result = await userController.doRegistration(req.body, req.file);

    if (result == "error") {
        res.render("registration", { message: "Email already taken pls register with other email" })
    } else { res.redirect("login"); }

});

router.post("/registration2", async (req, res) => {

    // console.log('file:', req.file);
    console.log('body:', req.body);


    const result = await userController.doRegistration2(req.body);

    if (result == "error") {
        res.render("registration", { message: "Email already taken pls register with other email" })
    } else { res.redirect("login"); }

});

router.get("/login", (req, res) => {
    res.render("login", { message: null });
});

router.post("/login", urlencodedParser, loginValidation, async (req, res) => {

    const match = await userController.matchLogin(req.body);
    if (match === "connot match email")
        res.render('login', { message: "connot match email pls register..." })
    if (match) {
        const userid = await userController.emailToId(req.body.userEmail);
        const query = querystring.stringify({
            id: String(userid),
            login: true
        });
        //res.redirect("/dashboard?" + query);  //old
        //  console.log(req.query.id);
        const limit = process.env.TOKEN_LIMIT;
        const key = process.env.JWT_KEY;
        //console.log(typeof key);
        //console.log(typeof (limit));
        let payload = {
            _id: userid,
            exp: Math.floor(Date.now() / 1000) + parseInt(limit),
        };
        const token = jwt.sign(payload, key);
        res.status(201).send({ token: token });
        //res.redirect('token?' + query);
    } else res.render("login", { message: "connot match password pls write currect one..." });
});


router.get("/logout", (req, res) => {
    res.redirect('login');
})

router.get("/token", async (req, res) => {
    //console.log("in token");
    // console.log(req.query.id);
    // const limit = process.env.TOKEN_LIMIT;
    // const key = process.env.JWT_KEY;
    // //console.log(typeof key);
    // //console.log(typeof (limit));
    // let payload = {
    //     _id: req.query.id,
    //     exp: Math.floor(Date.now() / 1000) + parseInt(limit),
    // };
    // const token = jwt.sign(payload, key);
    // res.status(201).send({ token: token });
});


module.exports = router;