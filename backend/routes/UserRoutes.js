const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

//middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload')

//registro de usuário
router.post('/register', UserController.register);

//login de usuário
router.post('/login', UserController.login);

//checando usuário
router.get('/checkuser', UserController.checkUser);

//resgatando usuário por id
router.get('/:id', UserController.getUserById);

//atualizando usuário
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.updateUser);


module.exports = router;

