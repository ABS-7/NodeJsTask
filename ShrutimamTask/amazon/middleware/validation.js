const joi = require('joi');

const registartionSchema = joi.object({
    userName: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    userPassword: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .max(20)
        .min(3),

    userEmail: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),

});

const loginSchema = joi.object({

    userPassword: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .max(20)
        .min(3),

    userEmail: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),

});

const productSchema = joi.object({

    productName: joi.string()
        .max(50)
        .min(3),

    productPrice: joi.number(),
    productStock: joi.number(),
});



function registrationValidation(req, res, next) {
    //console.log(req.body);
    const { error, value } = registartionSchema.validate(req.body);
    //console.log(error);
    if (error != null) {
        res.status(401).send(error.details[0].message);

    } else {
        console.log("next");
        next();
    }

}

function loginValidation(req, res, next) {
    //console.log(req.body);
    const { error, value } = loginSchema.validate(req.body);
    //console.log(error);
    if (error != null) {
        res.status(401).send(error.details[0].message);

    } else {
        console.log("next");
        next();
    }

}

function productValidation(req, res, next) {
    //console.log(req.body);
    const { error, value } = productSchema.validate(req.body);
    //console.log(error);
    if (error != null) {
        res.status(401).send(error.details[0].message);

    } else {
        console.log("next");
        next();
    }

}

module.exports = {
    registrationValidation: registrationValidation,
    loginValidation: loginValidation,
    productValidation: productValidation,
}