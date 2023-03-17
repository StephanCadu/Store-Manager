const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const productsModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const {
  sales, updateReturn, itemsToUpdate, wrongSales, products, wrongItemsToUpdate
} = require('./mocks/sales.service.mock');

describe('Testes de unidade do salesService', function () {
  describe('Testando a inserção de vendas', function () {
    it('É possível inserir uma ou mais vendas com sucesso', async function () {
      sinon.stub(salesModel, 'insert').resolves(3);
      const response = await salesService.createSales(sales);
      expect(response.message).to.deep.equal({ id: 3, itemsSold: sales });
    });
    it('Retorna erro ao inserir uma venda com id inexistente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const response = await salesService.createSales(wrongSales);
      expect(response.message).to.deep.equal('Product not found');
    });
  });
  describe('Testando a busca de vendas', function () {
    it('É possível buscar todas as vendas com sucesso', async function () {
      sinon.stub(salesModel, 'findAll').resolves(sales);
      const response = await salesService.getSales();
      expect(response.message).to.deep.equal(sales);
    });
    it('É possível buscar uma venda por id com sucesso', async function () {
      sinon.stub(salesModel, 'findById').resolves(sales[0]);
      const response = await salesService.getSalesById(1);
      expect(response.message).to.deep.equal(sales[0]);
    });
    it('Retorna erro ao buscar uma venda com id inexistente', async function () {
      sinon.stub(salesModel, 'findAll').resolves(sales);
      const response = await salesService.getSalesById(999);
      expect(response.message).to.deep.equal('Sale not found');
    });
  });
  describe('Testando atualização e remoção de uma venda', function () {
    it('É possível deletar uma venda com sucesso', async function () {
      sinon.stub(salesModel, 'remove').resolves('Sale with id 1 deleted');
      const response = await salesService.removeSale(1);
      expect(response.message).to.deep.equal('Sale with id 1 deleted');
    });
    it('Retorna erro ao deletar uma venda inexistente', async function () {
      sinon.stub(salesModel, 'findAll').resolves(sales);
      const response = await salesService.removeSale(999);
      expect(response.message).to.deep.equal('Sale not found');
    });
    it('É possível atualizar uma venda com sucesso', async function () {
      sinon.stub(salesModel, 'update').resolves('Sale with id 1 updated');
      const response = await salesService.updateSales(itemsToUpdate, 1);
      expect(response.message).to.deep.equal(updateReturn);
    });
    it('Retorna erro ao atualizar uma venda inexistente', async function () {
      sinon.stub(salesModel, 'findAll').resolves(sales);
      const response = await salesService.updateSales(itemsToUpdate, 999);
      expect(response.message).to.deep.equal('Sale not found');
    });
    it('Retorna erro ao atualizar uma venda com produto inexistente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const response = await salesService.updateSales(wrongItemsToUpdate, 1);
      expect(response.message).to.deep.equal('Product not found');
    });
  });
  afterEach(sinon.restore);
});