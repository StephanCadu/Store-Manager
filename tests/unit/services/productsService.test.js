const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { products, filteredProducts } = require('./mocks/products.service.mock');

describe('Testes de unidade do productsService', function () {
  describe('Testando a busca de produtos', function () {
    it('Busca todos os produtos com sucesso', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const response = await productsService.getProducts();
      expect(response.message).to.deep.equal(products);
    });
    it('Busca um produto por id com sucesso', async function () {
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      const response = await productsService.getProductById(1);
      expect(response.message).to.deep.equal(products[0]);
    });
    it('Retorna erro ao buscar um produto com id inexistente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const response = await productsService.getProductById(999);
      expect(response.message).to.deep.equal('Product not found');
    });
    it('É possível buscar produtos por nome corretamente', async function () {
      sinon.stub(productsModel, 'findByName').resolves(filteredProducts);
      const response = await productsService.getProductsByName('de');
      expect(response.message).to.equal(filteredProducts);
    });
  });
  describe('Testando a inserção e atualizacão de um produto', function () {
    it('É possível inserir um produto com sucesso', async function () {
      sinon.stub(productsModel, 'insert').resolves(4);
      const response = await productsService.createProduct({ name: 'Shape Primitive Tiago Lemos' });
      expect(response.message).to.deep.equal({ name: 'Shape Primitive Tiago Lemos', id: 4 });
    });
    it('É possível atualizar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'update').resolves(products[0]);
      const response = await productsService.updateProduct(products[0]);
      expect(response.message).to.deep.equal(products[0]);
    });
    it('Retorna erro ao atualizar um produto com id inexistente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const response = await productsService.updateProduct({ productId: 999, quantity: 1 });
      expect(response.message).to.deep.equal('Product not found');
    });
  });
  describe('Testando a deleção de um produto', function () {
    it('É possível deletar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'remove').resolves('Product with id 1 deleted');
      const response = await productsService.removeProduct(1);
      expect(response.message).to.equal('Product with id 1 deleted');
    });
    it('Retorna erro ao deletar um produto com id inexistente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const response = await productsService.removeProduct(999);
      expect(response.message).to.deep.equal('Product not found');
    });
  })
  afterEach(sinon.restore);
});