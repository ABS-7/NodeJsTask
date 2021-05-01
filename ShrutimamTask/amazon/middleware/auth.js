const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;
module.exports = {
    jwtAuth: function (req, res, next) {
        console.log(req.headers.token);
        const token = req.headers.token;
        if (token !== undefined) {
            try {
                let payload = jwt.verify(token, key);
                console.log('done');
                next();
            } catch (error) {
                res.status(401).send("token expired or invalid");
            }
        } else {
            res.status(401).send("token invalid");
        }
    }
}