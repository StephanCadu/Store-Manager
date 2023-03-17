const express = require('express');
const salesController = require('../controllers/salesController');
const validateSales = require('../middlewares/validateSalesMiddleware');

const router = express.Router();

router.post('/', validateSales, salesController.createSales);

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSalesById);

router.delete('/:id', salesController.removeSale);

router.put('/:id', validateSales, salesController.updateSales);

module.exports = router;