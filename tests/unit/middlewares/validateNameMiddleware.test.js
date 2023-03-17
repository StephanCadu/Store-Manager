const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateName = require('../../../src/middlewares/validateNameMiddleware');

const { expect } = chai;
chai.use(sinonChai);

describe('Testando o middleware validateName', function () {
  it('Retorna erro quando a chave "name" não é passada', function () {
    const res = {};
    const req = { body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    validateName(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  it('Retorna erro quando a chave "name" possui menos de 5 caracteres', function () {
    const res = {};
    const req = { body: { name: 'Nome' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    validateName(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  afterEach(sinon.restore);
});