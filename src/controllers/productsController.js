const productsService = require('../services/productsService');
const mapType = require('../utils/mapType');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { type, message } = await productsService.getProductById(+req.params.id);
  if (type) return res.status(mapType(type)).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { message } = await productsService.createProduct(req.body);
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { type, message } = await productsService.updateProduct({ ...req.body, ...req.params });
  if (type) return res.status(mapType(type)).json({ message });
  res.status(200).json(message);
};

const removeProduct = async (req, res) => {
  const { type, message } = await productsService.removeProduct(+req.params.id);
  if (type) return res.status(mapType(type)).json({ message });
  res.sendStatus(204);
};

const getProductsByName = async (req, res) => {
  const { message } = await productsService.getProductsByName(req.query.q);
  res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
  getProductsByName,
};