const expect = require('chai').expect;
const pos = require('..');

describe('pos-tag', function () {
  it('POS tags stuff', function () {
    return pos('Hi there my fine friend, I hope you are well, and eating your delicioius cranberries.')
    .then(function (result) {
      expect(result).to.be.an('array');
      expect(result.length).to.equal(15);
      result.forEach(function (tuple) {
        expect(tuple).to.be.an('object');
        expect(tuple).to.have.keys('word', 'pos');
      });
    });
  });

  it('even handles HTML ', function () {
    return pos('Hi there my <em> fine friend </em>, I hope you are well, and eating your <strong> delicioius </strong> cranberries.')
    .then(function (result) {
      expect(result).to.be.an('array');
      expect(result.length).to.equal(15);
    });
  });

  it('tags "easy selling point" properly', () => {
    return pos("Maybe it's an easy selling point and works well for an ad, and that's why Apple emphasizes those features.")
    .then((result) => {
      expect(result).to.be.an('array');
      expect(result.length).to.equal(19);
      expect(result[4]).to.deep.eql({ word: 'selling', pos: 'NN' });
    });
  });
});
