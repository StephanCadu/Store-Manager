const Joi = require('joi');

const idSchema = Joi.object({ id: Joi.number().integer().min(1).required() });

const nameSchema = Joi.object({ name: Joi.string().min(5).required() });

const saleSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const salesCheck = (sales) => sales.reduce((acc, sale) => {
  if (acc.error) return acc;
  const result = saleSchema.validate(sale);
  if (result.error) return { error: result.error };
  return acc;
}, { error: null });

module.exports = {
  idSchema,
  nameSchema,
  salesCheck,
};
