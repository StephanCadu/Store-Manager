const connection = require('./connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
    [],
  );
  return insertId;
};

const insert = async (sales, id = null) => {
  const saleId = id || await insertSale();
  const allPlaceholders = sales.map((_) => '(?, ?, ?)').join(', ');
  const allValues = sales
    .reduce((acc, { productId, quantity }) => [...acc, saleId, productId, quantity], []);
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES ${allPlaceholders}`,
    allValues,
  );
  return saleId;
};

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, sa.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sa.id = sp.sale_id
      ORDER BY saleId, productId`,
  );
  return sales;
};

const findById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT
      sa.date,
      sp.product_id AS productId,
      sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS sa
      ON sa.id = sp.sale_id
      AND sa.id = ?
      ORDER BY sa.id, sp.product_id`,
    [id],
  );
  return sales;
};

const remove = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return `Sale with id ${id} deleted`;
};

const removeSales = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

const updateSales = async (sales, saleId) => {
  await removeSales(saleId);
  await insert(sales, saleId);
};

const update = async (sales, saleId) => {
  await updateSales(sales, saleId);
  return `Sale with id ${saleId} updated`;
};

module.exports = {
  insert,
  findAll,
  findById,
  remove,
  update,
};