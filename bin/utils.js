const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const cj = require('color-json')

exports.colors = {
  error: chalk.bold.red,
  success: chalk.bold.green,
  warning: chalk.hex('#FFA500'),
  json: cj
}

exports.readJsonFile = input => {
  try {
    const file = path.join(process.cwd(), input)

    return JSON.parse(fs.readFileSync(file))
  } catch {
    throw new Error(`[CLI/readJsonFile]: file "${input}" parsing failed`)
  }
}
