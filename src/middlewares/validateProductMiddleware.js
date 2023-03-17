const validations = require('./validations/schemas');
const mapType = require('../utils/mapType');

const validateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { error } = validations.idSchema.validate({ id });
  if (error) {
    return res.status(mapType(error.details[0].type))
      .json({ message: error.details[0].message });
  }

  next();
};

module.exports = validateProduct;