const multer = require('multer');
const path = require('path');

const imagestorage = multer.diskStorage({
    destination:function(req, file, cb){

        let folder = ''

        if(req.baseUrl.includes('users')){
           folder = 'users'

        } else if(req.baseUrl.includes('pets')){
            folder = 'pets'

        }

        cb(null, `public/images/${folder}`)
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + string(Math.floor(Math.random() * 1000)) + path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imagestorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error('Por favor, envie apenas jpg ou png!'))
        }
        cb(null, true)
    }
})

module.exports = { imageUpload }