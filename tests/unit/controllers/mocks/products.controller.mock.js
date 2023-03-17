const products = [
  {
    id: 1,
    name: 'Martelo do Thor',
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

const allProductsReturn = { type: null, message: products };

const productReturn = { type: null, message: products[0] };

const badProductReturn = { type: 'INVALID_VALUE', message: 'Product not found' };

const newProduct = { name: 'Truck Independent', id: 4 };

const insertReturn = { type: null, message: newProduct };

const updateReturn = { type: null, message: { name: 'Martelo do Batman', id: 1 } }

const filteredProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const findNameReturn = { type: null, message: filteredProducts };

module.exports = {
  products,
  allProductsReturn,
  productReturn,
  badProductReturn,
  insertReturn,
  updateReturn,
  findNameReturn,
};