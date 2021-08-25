const inquirer = require('inquirer')
const convert = require('../lib/convert')
const { colors } = require('./utils')

const funcs = [convert.bytesToString.name, convert.stringToBytes.name]

const argvConfig = yargs =>
  yargs.option('run', {
    alias: 'r',
    describe: 'run convert function',
    choices: funcs,
    type: 'string'
  }).argv

const run = async argv => {
  try {
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
        const { str, start, length } = await inquirer.prompt([
          {
            type: 'input',
            name: 'str',
            message: 'Provide a data for function'
          },
          {
            type: 'confirm',
            name: 'extra',
            message: 'Do you need extra args?'
          },
          {
            type: 'number',
            name: 'start',
            message: 'Convert start location for data',
            default: 0,
            when: ({ extra }) => extra
          },
          {
            type: 'number',
            name: 'length',
            message: 'Converted string length',
            when: ({ extra }) => extra,
            default: ({ start: answeredStart, str: answeredStr }) =>
              answeredStr.startsWith('0x')
                ? answeredStr.length / 2 - 1 - answeredStart
                : answeredStr.length - answeredStart
          }
        ])

        result = convert[func](str, start, length)
    }

    console.log(colors.success(`Convert function "${func}" output:`))
    console.log(result)
    process.exit(0)
  } catch (err) {
    console.log(colors.error(`${err.message}`))
    process.exit(1)
  }
}

module.exports = ['convert', 'Data type convert', argvConfig, run]
