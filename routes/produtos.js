const express = require('express');
const router = express.Router();
const produtos_controller = require('../controllers/produtos_controller');


router.get('/', produtos_controller.getProduto);
router.get('/:id_produto', produtos_controller.getIdProduto);


module.exports = router;

