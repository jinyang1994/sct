const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const cj = require('color-json')
const inquirer = require('inquirer')

const colors = {
  error: chalk.bold.red,
  success: chalk.bold.green,
  warning: chalk.hex('#FFA500'),
  json: cj
}

exports.colors = colors

exports.readJsonFile = input => {
  try {
    const file = path.join(process.cwd(), input)

    return JSON.parse(fs.readFileSync(file))
  } catch {
    throw new Error(`[CLI/readJsonFile]: file "${input}" parsing failed`)
  }
}

exports.generateCommand = (moduleName, message, addYargsConfig, funcs) => [
  moduleName,
  message,
  yargs => {
    const baseYargsConfig = yargs.option('run', {
      alias: 'r',
      describe: 'run function:',
      choices: Object.keys(funcs),
      type: 'string'
    })

    return addYargsConfig(baseYargsConfig).argv
  },
  async argv => {
    try {
      const { funcName } = await inquirer.prompt(
        {
          type: 'list',
          name: 'funcName',
          message: 'What do you want to run?',
          choices: Object.keys(funcs)
        },
        { func: argv.run || undefined }
      )
      const func = funcs[funcName]
      const { required, optional } = func.options.reduce(
        (res, arg) => {
          if (arg.required) {
            res.required.push(arg)
          } else {
            res.optional.push(arg)
          }

          return res
        },
        { required: [], optional: [] }
      )
      let options = required.map(({ name, ...others }) => ({
        name,
        message: name,
        ...others
      }))
      if (optional.length) {
        options = options.concat([
          {
            type: 'confirm',
            name: 'extra',
            message: 'Do you need extra args?'
          },
          ...optional.map(({ name, ...others }) => ({
            name,
            message: `${name}:`,
            when: ({ extra }) => extra,
            ...others
          }))
        ])
      }
      const data = await inquirer.prompt(options)
      const result = func.handler(data, argv)

      console.log(
        colors.success(`${moduleName} function "${funcName}" output:`)
      )
      console.log(result)
      process.exit(0)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }
]
