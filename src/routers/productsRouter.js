const express = require('express');
const productsController = require('../controllers/productsController');
const validateName = require('../middlewares/validateNameMiddleware');
const validateProduct = require('../middlewares/validateProductMiddleware');

const router = express.Router();

router.get('/search', productsController.getProductsByName);

router.get('/', productsController.getProducts);

router.get('/:id', validateProduct, productsController.getProductById);

router.post('/', validateName, productsController.createProduct);

router.put('/:id', validateName, validateProduct, productsController.updateProduct);

router.delete('/:id', validateProduct, productsController.removeProduct);

module.exports = router;