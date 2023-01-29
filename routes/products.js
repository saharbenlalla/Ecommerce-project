const express = require('express');
const {
    createProduct,
    showProduct,
    productById,
    removeProduct,
    updateProduct,
    allProducts, 
    relatedProduct,
    searchProduct,
    photoProduct
} = require('../controllers/productContoller');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');
const { userById } = require('../middlewares/user');


const router = express.Router();
router.get('/:productId', showProduct);
router.get('/', allProducts);
router.get('/photo/:productId', photoProduct);
router.get('/related/:productId', relatedProduct);
router.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createProduct);
router.post('/search', searchProduct);
router.put('/:productId/:userId', [requireSignIn, isAuth, isAdmin], updateProduct);
router.delete('/:productId/:userId', [requireSignIn, isAuth, isAdmin], removeProduct);
router.param('userId', userById);
router.param('productId', productById);

module.exports = router;