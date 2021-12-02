const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAdmin, isLoggedIn } = require('../middleware/auth');

router.post('/', isLoggedIn,isAdmin, categoryController.create);

router.delete('/:id',isLoggedIn,isAdmin, categoryController.delete);

module.exports = router;