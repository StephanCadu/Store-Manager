const productsModel = require('../../models/productsModel');

const verifyProduct = async (id) => {
  const products = await productsModel.findAll();
  const product = products.find((prod) => prod.id === +id);
  if (!product) return { type: 'INVALID_VALUE', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = { verifyProduct };