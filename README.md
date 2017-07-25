# Pos-tag [![Build Status](https://secure.travis-ci.org/noblesamurai/pos-tag.png?branch=master)](http://travis-ci.org/noblesamurai/pos-tag) [![NPM version](https://badge-me.herokuapp.com/api/npm/pos-tag.png)](http://badges.enytc.com/for/npm/pos-tag)

> Simple POS tagging for a given string.

## Purpose

Obtain POS tagging of a string which may contain HTML tags.

## Usage

```js
const pos = require('pos-tag');
const expect = require('chai').expect;

const result = pos('Hi there my fine friend, I hope you are well, and eating your delicioius cranberries.');

expect(result).to.be.an('array');
expect(result.length).to.equal(15);
result.forEach(function (tuple) {
  expect(tuple).to.be.an('object');
  expect(tuple).to.have.keys('word', 'pos');
});

const result = pos('Hi there my <em> fine friend </em>, I hope you are well, and eating your <strong> delicioius </strong> cranberries.');

expect(result2).to.be.an('array');
expect(result2.length).to.equal(18);
```

## API

```js
module.exports(string)
// returns something like:

[ { word: 'Hi', pos: 'UH' },
  { word: 'there', pos: 'EX' },
  { word: 'my', pos: 'PRP$' },
  { word: 'fine', pos: 'JJ' },
  { word: 'friend', pos: 'NN' },
  { word: ',', pos: ',' },
  { word: 'I', pos: 'NN' },
  { word: 'hope', pos: 'NN' },
  { word: 'you', pos: 'PRP' },
  { word: 'are', pos: 'VBP' },
  { word: 'well', pos: 'RB' },
  { word: ',', pos: ',' },
  { word: 'and', pos: 'CC' },
  { word: 'eating', pos: 'VBG' },
  { word: 'your', pos: 'PRP$' },
  { word: 'delicioius', pos: 'NNS' },
  { word: 'cranberries', pos: 'NNS' },
  { word: '.', pos: '.' } ]
```

## Installation

This module is installed via npm:

``` bash
$ npm install pos-tag
```
## License

The BSD License

Copyright (c) 2017, Tim Allen

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Tim Allen nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

