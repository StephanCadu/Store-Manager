const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateSales = require('../../../src/middlewares/validateSalesMiddleware');

const { expect } = chai;
chai.use(sinonChai);

describe('Testado o middleware validateSales', function () {
  it('Retorna erro quando a chave "productId" não é passada', async function () {
    const res = {};
    const req = { body: [{ quantity: 2 }] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateSales(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('Retorna erro quando a chave "quantity" não é passada', async function () {
    const res = {};
    const req = { body: [{ productId: 2 }] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateSales(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('Retorna erro quando a chave "quantity" não é um número maior que 0', async function () {
    const res = {};
    const req = { body: [{ productId: 1, quantity: 0 }] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateSales(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  afterEach(sinon.restore);
});