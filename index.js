const visit = require('unist-util-visit');
const english = require('retext-english');
const pos = require('retext-pos');
const toString = require('nlcst-to-string');
const rehypePlaintext = require('rehype-plaintext');
const unified = require('unified');
const parse = require('rehype-parse');
const retextStringify = require('retext-stringify');

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
        .use(pos)
        .use(function () {
          return function (cst) {
            visit(cst, 'WordNode', function (node) {
              var item = {
                word: toString(node),
                pos: node.data.partOfSpeech
              };
              items.push(item);
            });
          };
        })
        .use(retextStringify)
        .process(input);
      return resolve(items);
    }
  });
};
