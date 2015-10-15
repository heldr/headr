#!/usr/bin/env node
'use strict';

// Dependencies
const FS = require('fs');
const PATH = require('path');
const ARGS = require('minimist')(process.argv.slice(2));
const PKG = require(PATH.join(process.cwd(), 'package.json'));

// Templates
const SPACES = amount => new Array(amount + 1).join(' ');
const TAB = SPACES((ARGS['h-tab-spaces'] + 2 || 2));
const PREFIX = `${TAB}*`;
const ROOT_PREFIX = `${SPACES((ARGS['h-tab-spaces'] || 0))}/**`;
const HEADLINE = `${PREFIX} ${PKG.name} - ${PKG.description}`;
const BASE = [ROOT_PREFIX, HEADLINE, PREFIX];
const CHECK_VERSION = key => (key==='version') ? 'v': '';
const CHECK_LABEL = key => (ARGS[key].trim) ? ARGS[key] : key;
const FIELD = key => `${PREFIX} @${CHECK_LABEL(key)} ${CHECK_VERSION(key)}${PKG[key]}`;
const MATCH = key => PKG[key];
const EXTRA = () => Object.keys(ARGS).slice(1).filter(MATCH).map(FIELD);
const EOL = [`${TAB}*/`, ''];
const BANNER = BASE.concat(EXTRA(), EOL).join('\n');

// IO
const OUTPUT = data => ARGS.o ?
  FS.writeFile(ARGS.o, data, err => process.exit(err)) : console.log(data);
const INPUT = stream => {
  let content = ['\n'];

  stream.on('data', chunk => content.push(chunk));
  stream.on('error', err => {throw err});
  stream.on('end', () => OUTPUT([BANNER].concat(content).join('')));
}

// Lights, camera, action!
if (ARGS._.length) {
  INPUT(FS.createReadStream(ARGS._[0]));
} else if (process.stdin.isTTY) {
  OUTPUT(BANNER);
} else {
  INPUT(process.stdin);
}
