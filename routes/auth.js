const express = require('express');
const {sahar, signup, signin, signout} = require('../controllers/authController');
const {userSignUpValidator} = require('../middlewares/userValidator');
const {requireSignIn} = require('../middlewares/auth')
const router = express.Router();

router.get('/', sahar);
router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);


router.get('/fikou', requireSignIn, (req,res)=>{
    res.send('Fikou mezel bekry')
})

module.exports = router;

