const express = require('express');
const router = express.Router();
const PetController = require('../controllers/PetController');

//middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets);
router.get('/myadoptions',verifyToken, PetController.getAllUsersAdoptions);

module.exports = router;
