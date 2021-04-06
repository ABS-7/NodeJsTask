const express = require("express");
const { route } = require("./userRouts");
const productController = require("../controllers/product");
const bodyParser = require('body-parser');
const querystring = require('querystring');

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(express.json());

router.get('/', async(req, res) => {
    console.log(req.query.login);
    if (req.query.login == undefined) {
        res.redirect("/user/login");
    }
    const data = await productController.getProducts();
    res.render("dashboard", { data: data, email: req.query.email });
});


router.get('/addProduct', async(req, res) => {
    console.log(req.query.email);
    if (req.query.message) {
        res.render("addProduct", { message: req.query.message, email: req.query.email });
    } else {
        res.render("addProduct", { message: null, email: req.query.email });
    }
});

router.post('/addProduct', urlencodedParser, async(req, res) => {
    console.log(req.body);
    const result = await productController.addProduct(req.body);
    if (result === "error") {
        const query = querystring.stringify({
            email: req.body.userEmail,
            login: true,
            message: "error occured pls try again..."
        });
        res.redirect("/dashboard/addProduct?" + query);
    } else {
        const query = querystring.stringify({
            email: req.body.userEmail,
            login: true
        });
        res.redirect("/dashboard?" + query);
    }
});

router.get('/editProduct', async(req, res) => {
    const userProducts = await productController.getUserProducts(req.query.email);
    //console.log(userProducts + userProducts);
    if (userProducts.length == 0) {
        const query = querystring.stringify({
            email: req.query.email,
            login: true,
            message: "You didn't added any product pls add product..."
        });
        res.redirect("/dashboard/addProduct?" + query);
    } else {
        res.render("editProduct", { data: userProducts, email: req.query.email });
    }
});
router.post("/editProduct", urlencodedParser, (req, res) => {
    res.render("editProductForm", { values: req.body });
});

router.post("/editProduct/form", urlencodedParser, async(req, res) => {
    const result = await productController.editProduct(req.body);
    if (result != "error") {
        const query = querystring.stringify({
            email: req.body.userEmail,
            login: true
        });
        res.redirect("/dashboard?" + query);
    }
});

router.post("/deletetProduct", urlencodedParser, async(req, res) => {
    const result = await productController.deleteProduct(req.body);
    if (result != "error") {
        const query = querystring.stringify({
            email: req.body.userEmail,
            login: true
        });
        res.redirect("/dashboard?" + query);
    }
});


router.post("/purchase", urlencodedParser, async(req, res) => {
    console.log(req.body);
    const result = await productController.productPurchase(req.body);
    if (result != "error") {
        const query = querystring.stringify({
            email: req.body.userEmail,
            login: true
        });
        res.redirect("/dashboard?" + query);
    }
});


router.get("/history", async(req, res) => {
    const purcheses = await productController.getHistory(req.query.email);
    if (purcheses == []) {

    } else {
        console.log("in else");
        console.log("purcheses ==> ", purcheses);
        res.render("history", { email: req.query.email, data: purcheses });
    }

});

module.exports = router;