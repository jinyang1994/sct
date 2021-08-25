#!/usr/bin/env node
const abi = require('./abi')
const convert = require('./convert')
const pkg = require('../package.json')

/* eslint-disable no-unused-expressions */
require('yargs')
  .command(...abi)
  .command(...convert)
  .help('help')
  .alias('help', 'h')
  .version(pkg.version)
  .alias('version', 'v')
  .epilog(`Copyright (c) ${new Date().getFullYear()}`).argv
