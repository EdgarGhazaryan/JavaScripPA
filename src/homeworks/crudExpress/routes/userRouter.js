const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/users/create', userController.createUser);

router.get('/users/getAll', userController.getAllUsers);

router.get('/users/get/:key', userController.getUserByKey);

router.put('/users/update/:id', userController.updateUser);

router.delete('/users/delete/:id', userController.deleteUser);


module.exports = router;