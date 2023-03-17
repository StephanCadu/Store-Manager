const errors = {
  'number.min': 422,
  'number.required': 400,
  'string.min': 422,
  'string.required': 400,
  'any.required': 400,
  INVALID_VALUE: 404,
};

const mapType = (type) => errors[type] || 500;

module.exports = mapType;