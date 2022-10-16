const express = require('express');
const UserController = require('../controller/UserController');
//import express router module
const router = express.Router();

router.get('/',UserController.findAll);
router.post('/',UserController.create);
router.get('/:id',UserController.findOne);
router.put('/:id',UserController.update);
router.delete('/:id',UserController.destroy);

module.exports = router;