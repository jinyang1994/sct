const fs = require('fs')
const path = require('path')
const abi = require('../lib/abi')
const { error, success, json } = require('./color')

const argvConfig = yargs =>
  yargs
    .option('file', {
      alias: 'f',
      describe: 'provide a ABI JSON file',
      type: 'string'
    })
    .option('run', {
      alias: 'r',
      describe: 'run ABI function',
      type: 'string'
    })
    .option('data', {
      describe: 'provide a data for function',
      type: 'string'
    })
    .demandOption(
      ['file', 'run'],
      'Please provide both run and file arguments to work with ABI tool'
    ).argv

const run = argv => {
  const file = path.join(process.cwd(), argv.file)
  if (!fs.existsSync(file)) {
    console.log(error(`ABI Error: ABI JSON file "${file}" isn't exist`))
    process.exit(1)
  }
  const func = abi[argv.run]
  if (!func) {
    console.log(error(`ABI Error: function "${argv.run}" isn't exist`))
    process.exit(1)
  }
  const ABI = JSON.parse(fs.readFileSync(file))
  try {
    const result = abi[argv.run](ABI, argv.data)

    console.log(success(`ABI function "${argv.run}" output:`))
    console.log(typeof result === 'object' ? json(result) : result)
  } catch (err) {
    console.log(error(err.message))
  }
}

module.exports = ['abi', 'Smart Contract ABI interface', argvConfig, run]
