const salesModel = require('../models/salesModel');
const { verifySales, verifySale } = require('./validations/sales.validation');

const createSales = async (sales) => {
  const result = await verifySales(sales);
  if (result.type) return result;

  const id = await salesModel.insert(sales);
  return { type: null, message: { id, itemsSold: sales } };
};

const getSales = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const getSalesById = async (saleId) => {
  const result = await verifySale(saleId);
  if (result.type) return result;

  const sale = await salesModel.findById(saleId);
  return { type: null, message: sale };
};

const removeSale = async (saleId) => {
  const { type, message } = await verifySale(saleId);
  if (type) return { type, message };

  const result = await salesModel.remove(saleId);
  return { type: null, message: result };
};

const updateSales = async (sales, saleId) => {
  const salesResult = await verifySales(sales);
  const saleResult = await verifySale(saleId);

  if (salesResult.type) return salesResult;
  if (saleResult.type) return saleResult;

  await salesModel.update(sales, saleId);
  return { type: null, message: { saleId, itemsUpdated: sales } };
};

module.exports = {
  createSales,
  getSales,
  getSalesById,
  removeSale,
  updateSales,
};