import { expect } from 'chai'
import { decodeFunctionData, getFunction, NotExistFuncError } from '../src/abi'
import TEST_ABI from './assets/abi.json'

/* eslint-disable max-len */

const txData =
  '0x2e95b6c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000000000000000002bac0a9d3e80000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000003b6d03402e3bb99210ebaa7fae82c32b244e872610107088'

describe('ABI toolkit', function () {
  it('use ABI decode input data', function () {
    const decoded = decodeFunctionData(TEST_ABI, txData)

    expect(decoded.name).to.be.equal('unoswap')
    expect(decoded.inputs.length).to.be.equal(4)
  })

  it('use ABI decode not exist function input data', function () {
    const incorrectTxData =
      '0x2e95b6c20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000000000000000000000000000000002bac0a9d3e80000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000003b6d03402e3bb99210ebaa7fae82c32b244e872610107088'

    try {
      decodeFunctionData(TEST_ABI, incorrectTxData)
    } catch (error) {
      expect(error).to.be.instanceOf(NotExistFuncError)
    }
  })

  it('use function selector get function', function () {
    const func = getFunction(TEST_ABI, txData)

    expect(func.name).to.be.equal('unoswap')
  })

  it('use function name get function', function () {
    const func = getFunction(TEST_ABI, 'unoswap')

    expect(func.name).to.be.equal('unoswap')
  })
})
