const productsModel = require('../models/productsModel');
const { verifyProduct } = require('./validations/products.validation');

const getProducts = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const { type, message } = await verifyProduct(productId);
  if (type) return { type, message };

  const product = await productsModel.findById(productId);
  return { type: null, message: product };
};

const createProduct = async (product) => {
  const id = await productsModel.insert(product);
  return { type: null, message: { ...product, id } };
};

const updateProduct = async (product) => {
  const { type, message } = await verifyProduct(product.id);
  if (type) return { type, message };

  const result = await productsModel.update(product);
  return { type: null, message: result };
};

const removeProduct = async (id) => {
  const { type, message } = await verifyProduct(id);
  if (type) return { type, message };

  const result = await productsModel.remove(id);
  return { type: null, message: result };
};

const getProductsByName = async (name) => {
  const products = await productsModel.findByName(name);
  return { type: null, message: products };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
  getProductsByName,
};