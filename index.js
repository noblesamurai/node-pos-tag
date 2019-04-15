const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');
const unified = require('unified');
const parse = require('rehype-parse');
const rehype2retext = require('rehype-retext');
const Tag = require('en-pos').Tag;
const parseEnglish = require('parse-english');
const trim = require('lodash.trim');

// fix for the word "constructor" which is not in the lexicon (and returns a function which for
// some reason doesn't have a split method on it...)
const lexicon = require('en-lexicon');
lexicon.lexicon['constructor'] = 'NNP';

module.exports = function (input) {
  let items = [];
  if (trim(input) === '') return items;
  const processor = unified()
    .use(parse)
    .use(rehype2retext, parseEnglish)
    .use(function () {
      return function (cst) {
        visit(cst, 'SentenceNode', function (node) {
          let sentence = node.children
            .filter((c) => ['WordNode', 'PunctuationNode', 'SymbolNode'].includes(c.type))
            .map((c) => toString(c));

          // HACK: Truncate any word longer than 40 chars as en-pos will not be performant.
          let tags = new Tag(sentence.map((word) => word.slice(0, 40))).initial().smooth().tags;
          items = items.concat(sentence.map((word, i) => {
            return { word, pos: tags[i] };
          }));
        });
      };
    });
  let parsed = processor.parse(input);
  processor.runSync(parsed);

  return items;
};
