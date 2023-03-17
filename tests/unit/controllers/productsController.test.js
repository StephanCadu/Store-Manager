const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const {
  allProductsReturn,
  productReturn,
  badProductReturn,
  insertReturn,
  updateReturn,
  findNameReturn,
} = require('./mocks/products.controller.mock');

describe('Testes de unidade do productsController', function () {
  describe('Testando a busca de produtos', function () {
    it('Busca todos os produtos com sucesso', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts').resolves(allProductsReturn);
      await productsController.getProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsReturn.message);
    });
    it('Busca um produto por id com sucesso', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves(productReturn);
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productReturn.message);
    });
    it('Retorna erro ao buscar um id inexistente', async function () {
      const res = {};
      const req = { params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves(badProductReturn);
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
    it('É possível buscar produtos por nome corretamente', async function () {
      const res = {};
      const req = { query: { q: 'de' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductsByName').resolves(findNameReturn);
      await productsController.getProductsByName(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findNameReturn.message);
    });
  });
  describe('Testando a insercão e atualização de um novo produto', function () {
    it('É possível inserir um produto com sucesso', async function () {
      const res = {};
      const req = { body: { name: 'Truck Independent' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves(insertReturn);
      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(insertReturn.message);
    });
    it('É possível atualizar um produto com sucesso', async function () {
      const res = {};
      const req = { body: { name: 'Martelo do Batman' }, params: { id: '1' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').resolves(updateReturn);
      await productsController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateReturn.message);
    });
    it('Retorna erro ao atualizar um produto com id inexistente', async function () {
      const res = {};
      const req = { body: { name: 'Martelo do Batman' }, params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'updateProduct').resolves(badProductReturn);
      await productsController.updateProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Testando a deleção de um produto', function () {
    it('É possível deletar um produto com sucesso', async function () {
      const res = {};
      const req = { params: { id: '1' } };
      res.sendStatus = sinon.stub().returns();
      sinon.stub(productsService, 'removeProduct')
        .resolves({ type: null, message: 'Product with id 1 delted' });
      await productsController.removeProduct(req, res);
      expect(res.sendStatus).to.have.been.calledWith(204);
    });
    it('Retorna erro ao deletar um produto com id inexistente', async function () {
      const res = {};
      const req = { body: { name: 'Martelo do Batman' }, params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'removeProduct').resolves(badProductReturn);
      await productsController.removeProduct(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  afterEach(sinon.restore);
});