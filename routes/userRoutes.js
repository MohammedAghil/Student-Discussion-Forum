const express = require('express');
const router = express.Router();
router.get('/login',(req,res,next)=>{
    res.render('./users/login');
});
router.get('/register',(req,res,next)=>{
    res.render('./users/register');
});
module.exports = router;