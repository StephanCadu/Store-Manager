const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const { sales, itemsToUpdate } = require('./mocks/sales.model.mock');

describe('Testes de unidade do salesModel', function () {
  describe('Testando a inserção de vendas', function () {
    it('É possível inserir vendas com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
      const result = await salesModel.insert(sales);
      expect(result).to.equal(2);
    });
  });
  describe('Testando a busca de vendas', function () {
    it('É possível buscar todas as vendas com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesModel.findAll();
      expect(result).to.equal(sales);
    });
    it('É possível buscar uma venda por id com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesModel.findById(1);
      expect(result).to.equal(sales);
    });
  });
  describe('Testando atualização e remoção de uma venda', function () {
    it('É possível deletar uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves();
      const result = await salesModel.remove(1);
      expect(result).to.equal('Sale with id 1 deleted');
    });
    it('É possível atualizar uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves();
      const result = await salesModel.update(itemsToUpdate, 1);
      expect(result).to.equal('Sale with id 1 updated');
    });
  });
  afterEach(sinon.restore);
});