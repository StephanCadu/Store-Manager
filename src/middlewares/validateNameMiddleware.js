const validations = require('./validations/schemas');
const mapType = require('../utils/mapType');

const validateName = (req, res, next) => {
  const { name } = req.body;
  const { error } = validations.nameSchema.validate({ name });
  if (error) {
    return res.status(mapType(error.details[0].type))
      .json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateName;