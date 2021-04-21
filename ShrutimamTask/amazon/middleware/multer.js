const multer = require('multer');

const storageUser = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/userImg/');
    },
    filename: function(req, file, cb) {
        const ex = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, req.body.userEmail + ex);
    }
});

const storageProduct = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/productImg/');
    },
    filename: function(req, file, cb) {
        const ex = file.originalname.substr(file.originalname.lastIndexOf('.'));
        const date = Date.now();
        req.body.datestemp = date;
        cb(null, req.body.productName + '-' + date + ex);
    }
});

const UserStore = multer({ storage: storageUser });
const ProductStore = multer({ storage: storageProduct });

module.exports = {
    UserStore: UserStore,
    ProductStore: ProductStore
};