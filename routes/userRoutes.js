const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();
router.get('/login',(req,res,next)=>{
    res.render('./users/login');
});
router.get('/register',(req,res,next)=>{
    res.render('./users/register');
});
router.get('/profile',(req,res,next)=>{
    res.render('./users/profile');
});

router.post('/',controller.register);
router.post('/login',controller.login);

module.exports = router;