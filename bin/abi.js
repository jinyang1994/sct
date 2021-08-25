const inquirer = require('inquirer')
const abi = require('../lib/abi')
const { colors, readJsonFile } = require('./utils')

const funcs = [abi.getFunction.name, abi.decodeFunctionData.name]

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
      choices: funcs,
      type: 'string'
    })
    .demandOption(
      ['file'],
      'Please provide file arguments to work with ABI tool'
    ).argv

const run = async argv => {
  try {
    const ABI = readJsonFile(argv.file)
    const { func } = await inquirer.prompt(
      {
        type: 'list',
        name: 'func',
        message: 'What do you want to run?',
        choices: funcs
      },
      { func: argv.run || undefined }
    )
    let result

    // processing specify function
    switch (func) {
      default:
        const { data } = await inquirer.prompt({
          type: 'input',
          name: 'data',
          message: 'Provide a data for function'
        })

        result = abi[func](ABI, data)
    }

    console.log(colors.success(`ABI function "${func}" output:`))
    console.log(typeof result === 'object' ? colors.json(result) : result)
    process.exit(0)
  } catch (err) {
    console.log(colors.error(`${err.message}`))
    process.exit(1)
  }
}

module.exports = ['abi', 'Smart Contract ABI interface', argvConfig, run]
