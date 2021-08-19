const fs = require('fs')
const path = require('path')
const abi = require('../lib/abi')
const { error } = require('./color')

const argvConfig = yargs =>
  yargs
    .option('path', {
      alias: 'p',
      describe: 'provide a ABI JSON file path',
      type: 'string'
    })
    .option('run', {
      alias: 'r',
      describe: 'run ABI function',
      type: 'string'
    })
    .option('data', {
      describe: 'provide a tx data for function',
      type: 'string'
    })
    .demandOption(
      ['path', 'run'],
      'Please provide both run and path arguments to work with ABI tool'
    ).argv

const run = argv => {
  const file = path.join(process.cwd(), argv.path)
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
  let result
  if (argv.run === 'decodeFunctionData') {
    result = abi.decodeFunctionData(ABI, argv.data)
  } else {
    result = func(ABI)
  }

  console.log(JSON.stringify(result, null, 2))
}

module.exports = ['abi', 'Smart Contract ABI interface', argvConfig, run]
