const express = require('express');
const router = express.Router();
const multer = require('multer'); //para trabalhar com imagens
const login = require('../middleware/login');
const produtos_controller = require('../controllers/produtos_controller');
const path = require('path');
var FTPStorage = require('multer-ftp');

// filtro apenas para aceitar apenas jpg e png
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

var upload = multer({
    limits:{
        fileSize: 1024 * 1024 * 5   // limitará em 5MB
    },
    fileFilter: fileFilter,
    storage: new FTPStorage({
      basePath: process.env.BASE_PATCH_FTP,
      filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
      },      
      destination: function (req, file, options, callback){
        callback(null, path.join(options.basePath, 'prod_'+new Date().toISOString().replace(/:/g, '-') + "_" + file.originalname))
     },
      ftp: {        
        host: process.env.HOST_FTP,
        secure: false, // enables FTPS/FTP with TLS
        user: process.env.USER_FTP,
        password: process.env.PASSWORD_FTP
      }
    })
  });


router.get('/', produtos_controller.getProduto);
router.get('/:id_produto', produtos_controller.getIdProduto);

// insere um produto
router.post(
    '/',
    login.required, 
    upload.single('imagem_produto'), 
    produtos_controller.insereProduto);


module.exports = router;

