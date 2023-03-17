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
    "productId": 999,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const updateReturn = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};

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

const wrongItemsToUpdate = [
  {
    productId: 999,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

module.exports = {
  sales,
  updateReturn,
  itemsToUpdate,
  wrongSales,
  products,
  wrongItemsToUpdate,
};