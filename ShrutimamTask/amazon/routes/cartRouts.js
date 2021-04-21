const express = require("express");
const bodyParser = require('body-parser');
const cart = require('../controllers/cart');
const querystring = require('querystring');


let router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/", urlencodedParser, (req, res) => {
    res.render("cartForm", req.body);
});

router.post("/addcart", urlencodedParser, async(req, res) => {
    console.log("!!!!!!!!!!!!", req.body);
    const result = await cart.addToCart(req.body);
    const query = querystring.stringify({
        id: req.body.id
    });
    res.redirect("/dashboard?" + query);
});

router.get("/cartlist", async(req, res) => {

    const cartData = await cart.fetchData(req.query.id);
    //console.log(cartData[0]);
    res.render("cartList", { data: cartData[0], id: req.query.id, msg: req.query.msg });

});

router.post("/purchase", urlencodedParser, async(req, res) => {

    //console.log(req.body);
    const result = await cart.productPurchase(req.body);
    if (result === "stock is not avalable") {
        const query = querystring.stringify({
            id: req.body.id,
            msg: "stock is not avalable"
        });
        res.redirect("/dashboard/cart/cartlist?" + query);
    }
    const query = querystring.stringify({
        id: req.body.id
    });
    res.redirect("/dashboard/cart/cartlist?" + query);

});

router.post("/editCartForm", urlencodedParser, async(req, res) => {
    res.render("editCart", req.body);
});

router.post("/editcart", urlencodedParser, async(req, res) => {
    console.log(req.body);
    const result = await cart.editCart(req.body);
    const query = querystring.stringify({
        id: req.body.id
    });
    res.redirect("/dashboard/cart/cartlist?" + query);

});

router.post("/buyAll", urlencodedParser, async(req, res) => {
    // console.log(req.body);

    const result = await cart.buyall(req.body.id);
    console.log(result);
    if (result === "stock is not avalable") {
        const query = querystring.stringify({
            id: req.body.id,
            msg: "some product could not buy because not availability of stock"
        });
        res.redirect("/dashboard/cart/cartlist?" + query);
    } else {
        const query = querystring.stringify({
            id: req.body.id
        });
        res.redirect("/dashboard?" + query);
    }
});


router.post("/deleteCart", urlencodedParser, async(req, res) => {
    console.log(req.body);
    const result = await cart.deleteCart(req.body);
    const query = querystring.stringify({
        id: req.body.id
    });
    res.redirect("/dashboard/cart/cartlist?" + query);

});


module.exports = router;