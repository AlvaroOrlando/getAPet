const express = require('express');
const router = express.Router();
const PetController = require('../controllers/PetController');

//middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

//criar pet
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create);

//get all pets
router.get('/', PetController.getAll);

//get user pets
router.get('/mypets', verifyToken, PetController.getAllUserPets);

//get user adopted pets
router.get('/myadoptions',verifyToken, PetController.getAllUsersAdoptions);

//get pet by id
router.get('/:id', PetController.getPetById);

//remove pet by id
router.delete('/:id', verifyToken, PetController.removePetById);

module.exports = router;
