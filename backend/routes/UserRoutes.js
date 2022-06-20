const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

//registro de usuário
router.post('/register', UserController.register);

//login de usuário
router.post('/login', UserController.login);

//checando usuário
router.get('/checkuser', UserController.checkUser);

//resgatando usuário por id
router.get('/:id', UserController.getUserById);

module.exports = router;

