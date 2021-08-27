const { getFunction, decodeFunctionData } = require('../lib/abi')
const { colors, readJsonFile, generateCommand } = require('./utils')

module.exports = generateCommand(
  'abi',
  'Smart Contract ABI interface',
  yargs =>
    yargs
      .option('file', {
        alias: 'f',
        describe: 'provide a ABI JSON file',
        type: 'string'
      })
      .demandOption(
        ['file'],
        'Please provide file arguments to work with ABI tool'
      ),
  {
    getFunction: {
      options: [
        {
          type: 'input',
          name: 'inputData',
          required: true
        }
      ],
      handler: ({ inputData }, { file }) => {
        const ABI = readJsonFile(file)

        return getFunction(ABI, inputData)
      }
    },
    decodeFunctionData: {
      options: [
        {
          type: 'input',
          name: 'inputData',
          required: true
        }
      ],
      handler: ({ inputData }, { file }) => {
        const ABI = readJsonFile(file)
        const result = decodeFunctionData(ABI, inputData)

        return colors.json(result)
      }
    }
  }
)
