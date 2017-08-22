const expect = require('chai').expect;
const pos = require('..');

const leakage = require('leakage');

describe('pos-tag', function () {
  it.only('POS tags stuff', function () {
    this.timeout(2000 * 60);
    leakage.iterate(() => {
      pos('Hi there my fine friend, I hope you are well, and eating your delicioius cranberries.');
      /*
      expect(result).to.be.an('array');
      expect(result.length).to.equal(18);
      result.forEach(function (tuple) {
        expect(tuple).to.be.an('object');
        expect(tuple).to.have.keys('word', 'pos');
      });
      */
    });
  });

  it('even handles HTML ', function () {
    const result = pos('Hi there my <em> fine friend </em>, I hope you are well, and eating your <strong> delicioius </strong> cranberries.');
    expect(result).to.be.an('array');
    expect(result.length).to.equal(18);
  });

  it('tags "easy selling point" properly', () => {
    const result = pos("Maybe it's an easy selling point and works well for an ad, and that's why Apple emphasizes those features.");
    expect(result).to.be.an('array');
    expect(result.length).to.equal(21);
    expect(result[4]).to.deep.eql({ word: 'selling', pos: 'NN' });
  });

  it('doesn\'t die on the word "constructor"', () => {
    const result = pos('Constructor');
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0]).to.deep.eql({ word: 'Constructor', pos: 'NNP' });
  });
});
