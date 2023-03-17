const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id',
    [id],
  );
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );
  return insertId;
};

const update = async (product) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [product.name, product.id],
  );
  return product;
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return `Product with id ${id} deleted`;
};

const findByName = async (name) => {
  const allProducts = await findAll();
  const products = allProducts.filter((product) => product.name.includes(name));
  if (!products.length) return allProducts;
  return products;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  findByName,
};
