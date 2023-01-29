const express= require('express');
const {createCategory, categoryId, showCategory, allCategories, updateCategory, deleteCategory} = require('../controllers/categoryController');
const {requireSignIn , isAuth, isAdmin} = require('../middlewares/auth');
const {userById} = require('../middlewares/user');

const router = express.Router();

router.get('/:categoryId', showCategory);
router.get('/', allCategories);
router.post('/create/:userId', [requireSignIn , isAuth, isAdmin], createCategory);
router.put('/:categoryId/:userId', [requireSignIn , isAuth, isAdmin], updateCategory);
router.delete('/:categoryId/:userId', [requireSignIn , isAuth, isAdmin], deleteCategory);
router.param('userId', userById);
router.param('categoryId', categoryId);

module.exports = router;