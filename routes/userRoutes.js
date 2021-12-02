const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn, isAdmin} = require('../middleware/auth');
const {logInLimiter} = require('../middleware/rateLimiters');
const {validateSignUp, validateLogIn, validateResults} = require('../middleware/validator');

const router = express.Router();
router.get('/login',(req,res,next)=>{
    res.render('./users/login');
});
router.get('/register',(req,res,next)=>{
    res.render('./users/register');
});
router.get('/profile',isLoggedIn,controller.profile);

router.get('/admin',isLoggedIn,isAdmin,controller.admin);

router.post('/',controller.register);
router.post('/login',controller.login);

router.get('/logout',controller.logout);


module.exports = router;