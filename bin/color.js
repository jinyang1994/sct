const chalk = require('chalk')
const cj = require('color-json')

exports.error = chalk.bold.red
exports.success = chalk.bold.green
exports.warning = chalk.hex('#FFA500')
exports.json = cj
