'use strict';

const FS = require('fs');
const PATH = require('path');
const ARGS = require('minimist')(process.argv.slice(2));
const PKG = require(PATH.join(process.cwd(), 'package.json'));
const SPACES = amount => new Array(amount + 1).join(' ');
const TAB = SPACES((ARGS['h-tab-spaces'] + 2 || 2));
const PREFIX = `${TAB}*`;
const MAIN_PREFIX = `${SPACES((ARGS['h-tab-spaces'] || 0))}/**`;
const BASE = () => [
  MAIN_PREFIX,
  `${PREFIX} ${PKG.name} - ${PKG.description}`,
  PREFIX
];
const CHECK_VERSION = key => (key==='version') ? 'v': '';
const CHECK_LABEL = key => (ARGS[key].trim) ? ARGS[key] : key;
const KEYS = key => `${PREFIX} @${CHECK_LABEL(key)} ${CHECK_VERSION(key)}${PKG[key]}`;
const MATCH = key => PKG[key];
const EXTRA = () => Object.keys(ARGS).slice(1).filter(MATCH).map(KEYS);
const EOL = [`${TAB}*/`, ''];

if (ARGS._.length) {
  FS.readFile(ARGS._[0], 'utf8', (err, stdout) => {
    if (err) {
      throw new err;
    }

    console.log(BASE().concat(EXTRA(), EOL, [stdout]).join('\n'));
  });
} else {
  console.log(BASE().concat(EXTRA(), EOL).join('\n'));
}
