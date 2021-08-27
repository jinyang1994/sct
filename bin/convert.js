const { stringToBytes, bytesToString } = require('../lib/convert')
const { generateCommand } = require('./utils')

module.exports = generateCommand(
  'convert',
  'Data type convert',
  yargs => yargs,
  {
    stringToBytes: {
      options: [
        {
          type: 'input',
          name: 'str',
          required: true
        },
        {
          type: 'number',
          name: 'start',
          default: 0
        },
        {
          type: 'number',
          name: 'length',
          default: ({ start, str }) => str.length - start
        }
      ],
      handler: ({ str, start, length }) => stringToBytes(str, start, length)
    },
    bytesToString: {
      options: [
        {
          type: 'input',
          name: 'bytes',
          required: true
        },
        {
          type: 'number',
          name: 'start',
          default: 0
        },
        {
          type: 'number',
          name: 'length',
          default: ({ start, str }) => str.length / 2 - 1 - start
        }
      ],
      handler: ({ bytes, start, length }) => bytesToString(bytes, start, length)
    }
  }
)
