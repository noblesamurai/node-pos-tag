const zipWith = require('lodash.zipwith');
const Tag = require('en-pos').Tag;

module.exports = function (input) {
  const words = input.split(' ');

  const result = new Tag(words)
  .initial() // initial dictionary and pattern based tagging
  .smooth(); // further context based smoothing

  const ret = zipWith(result.tokens, result.tags, (word, pos) => ({ word, pos }));
  return ret;
};
