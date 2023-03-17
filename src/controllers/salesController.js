const salesService = require('../services/salesService');
const mapType = require('../utils/mapType');

const createSales = async (req, res) => {
  const { type, message } = await salesService.createSales(req.body);
  if (type) return res.status(mapType(type)).json({ message });
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { message } = await salesService.getSales();
  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { type, message } = await salesService.getSalesById(req.params.id);
  if (type) return res.status(mapType(type)).json({ message });
  return res.status(200).json(message);
};

const removeSale = async (req, res) => {
  const { type, message } = await salesService.removeSale(+req.params.id);
  if (type) return res.status(mapType(type)).json({ message });
  return res.sendStatus(204);
};

const updateSales = async (req, res) => {
  const { type, message } = await salesService.updateSales(req.body, +req.params.id);
  if (type) return res.status(mapType(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  removeSale,
  updateSales,
};