const visit = require('unist-util-visit');
const english = require('retext-english');
const toString = require('nlcst-to-string');
const rehypePlaintext = require('rehype-plaintext');
const unified = require('unified');
const parse = require('rehype-parse');
const retextStringify = require('retext-stringify');
const Tag = require('en-pos').Tag;

// fix for the word "constructor" which is not in the lexicon (and returns a function which for
// some reason doesn't have a split method on it...)
const lexicon = require('en-lexicon');
lexicon.lexicon['constructor'] = 'NNP';

module.exports = function (input) {
  return new Promise(function (resolve, reject) {
    unified()
      .use(parse)
      .use(rehypePlaintext)
      .process(input, generatePosTags);

    function generatePosTags (err, input) {
      if (err) return reject(err);
      var items = [];
      unified()
        .use(english)
        .use(function () {
          return function (cst) {
            visit(cst, 'SentenceNode', function (node) {
              let sentence = node.children
                .filter((c) => ['WordNode', 'PunctuationNode', 'SymbolNode'].includes(c.type))
                .map((c) => toString(c));
              let tags = new Tag(sentence).initial().smooth().tags;
              items = items.concat(sentence.map((word, i) => {
                return { word, pos: tags[i] };
              }));
            });
          };
        })
        .use(retextStringify)
        .process(input);
      return setImmediate(resolve, items);
    }
  });
};
