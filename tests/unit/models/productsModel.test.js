const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const { products, filteredProducts } = require('./mocks/products.model.mock');

describe('Testes de unidade do productsModel', function () {
  describe('Testando buscas de produtos', function () {
    it('Busca todos os produtos corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([products]);
      const result = await productsModel.findAll();
      expect(result).to.be.deep.equal(products);
    });

    it('Busca um produto por id corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([[products[0]]]);
      const result = await productsModel.findById(1);
      expect(result).to.be.deep.equal(products[0]);
    });
    it('É possível buscar produtos por nome corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([filteredProducts]);
      const result = await productsModel.findByName('de');
      expect(result).to.be.deep.equal(filteredProducts);
    });
    //  DANDO ERRO
    it('Retorna todos os produtos ao buscar um nome inexistente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(products);
      const result = await productsModel.findByName('xxxx');
      expect(result).to.be.deep.equal(products);
    });
  });
  describe('Testando a inserção e atualização de um produto', function () {
    it('É possível inserir um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const result = await productsModel.insert({ name: 'Shape Primitive Tiago Lemos' });
      expect(result).to.equal(4);
    });
    it('É possível atualizar um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);
      const result = await productsModel.update(products[0]);
      expect(result).to.deep.equal(products[0]);
    });
  });
  describe('Testando a deleção de um produto', function () {
    it('É possível deletar um prodto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves();
      const result = await productsModel.remove(1);
      expect(result).to.equal('Product with id 1 deleted');
    });
  });
  // it('', async function () {

  // });
  afterEach(sinon.restore);
});