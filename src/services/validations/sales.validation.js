const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const verifySales = async (sales) => {
  const products = await productsModel.findAll();
  const salesExist = sales.every((sale) => products
    .some((product) => product.id === sale.productId));
  if (!salesExist) {
    return { type: 'INVALID_VALUE', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const verifySale = async (id) => {
  const sales = await salesModel.findAll();
  const sale = sales.find(({ saleId }) => saleId === +id);
  if (!sale) return { type: 'INVALID_VALUE', message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = {
  verifySales,
  verifySale,
};