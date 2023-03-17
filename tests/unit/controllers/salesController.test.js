const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

const {
  goodReturn,
  sales,
  wrongSales,
  removeReturn,
  itemsToUpdate,
  updateReturn,
  badReturn,
} = require('./mocks/sales.controller.mock');

describe('Testes de unidade do salesController', function () {
  describe('Testando a insercão de novas vendas', function () {
    it('É possível inserir novas vendas com sucesso', async function () {
      const res = {};
      const req = { body: sales };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSales').resolves(goodReturn);
      await salesController.createSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(goodReturn.message);
    });
    it('Retorna erro ao inserir vendas com id inexistente', async function () {
      const res = {};
      const req = { body: wrongSales };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSales').resolves(badReturn);
      await salesController.createSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Testando a busca de vendas', function () {
    it('É possível buscar todas as vendas com sucesso', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves(goodReturn);
      await salesController.getSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(goodReturn.message);
    });
    it('É possível buscar uma venda por id com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves({ type: null, message: sales[0] });
      await salesController.getSalesById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales[0]);
    });
    it('Retorna erro ao buscar uma venda com id inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves(
        { type: 'INVALID_VALUE', message: 'Sale not found' }
      );
      await salesController.getSalesById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  describe('Testando atualização e remoção de uma venda', function () {
    it('É possível deletar uma venda com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.sendStatus = sinon.stub().returns();
      sinon.stub(salesService, 'removeSale').resolves(removeReturn);
      await salesController.removeSale(req, res);
      expect(res.sendStatus).to.have.been.calledWith(204);
    });
    it('Retorna erro ao deletar uma venda com id inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'removeSale').resolves(
        { type: 'INVALID_VALUE', message: 'Sale not found' }
      );
      await salesController.removeSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
    it('É possível atualizar uma venda com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: itemsToUpdate };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'updateSales').resolves(updateReturn);
      await salesController.updateSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateReturn.message);
    });
    it('Retorna erro ao atualizar uma venda com id inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'updateSales').resolves(
        { type: 'INVALID_VALUE', message: 'Sale not found' }
      );
      await salesController.updateSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  afterEach(sinon.restore);
});