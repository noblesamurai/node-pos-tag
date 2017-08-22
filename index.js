const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');
const unified = require('unified');
const parse = require('rehype-parse');
const rehype2retext = require('rehype-retext');
const Tag = require('en-pos').Tag;
const parseEnglish = require('parse-english');

// fix for the word "constructor" which is not in the lexicon (and returns a function which for
// some reason doesn't have a split method on it...)
const lexicon = require('en-lexicon');
lexicon.lexicon['constructor'] = 'NNP';

let items;
const processor = unified()
  .use(parse)
  .use(rehype2retext, parseEnglish);

module.exports = function (input) {
  return items;
};
