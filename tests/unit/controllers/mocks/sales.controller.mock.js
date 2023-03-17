const sales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const wrongSales = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const goodReturn = { id: 3, itemsSold: sales };

const badReturn = { type: 'INVALID_VALUE', message: 'Product not found' };

const removeReturn = { type: null, message: 'Sale with id 1 deleted' }

const itemsToUpdate = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const updateReturn = { type: null, message: { saleId: 1, itemsUpdated: itemsToUpdate } };

module.exports = {
  goodReturn,
  sales,
  removeReturn,
  itemsToUpdate,
  updateReturn,
  wrongSales,
  badReturn,
};
