const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/',commentController.create);

router.delete('/:id', commentController.delete);

router.put('/:id', commentController.update);

module.exports = router;