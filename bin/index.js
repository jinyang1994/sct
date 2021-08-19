#!/usr/bin/env node
const abi = require('./abi')
const pkg = require('../package.json')

/* eslint-disable no-unused-expressions */
require('yargs')
  .command(...abi)
  .help('help')
  .alias('help', 'h')
  .version(pkg.version)
  .alias('version', 'v')
  .epilog(`copyright ${new Date().getFullYear()}`).argv
