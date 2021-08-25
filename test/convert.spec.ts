import { expect } from 'chai'
import { bytesToString, stringToBytes } from '../src/convert'

describe('Convert toolkit', function () {
  it('Convert between bytes and string', function () {
    const str = 'Welcome to use sct'
    const bytes = stringToBytes(str)
    const result = bytesToString(bytes)

    expect(bytes.startsWith('0x')).to.be.true
    expect(bytes.length).to.be.equal(2 + str.length * 2)
    expect(result).to.be.equal(str)
  })

  it('Convert with stringToBytes start and length feature', function () {
    const start = 'Welcome '
    const context = 'to'
    const end = ' use sct'
    const str = start + context + end
    const bytes = stringToBytes(str, start.length, context.length)
    const result = bytesToString(bytes)

    expect(bytes.startsWith('0x')).to.be.true
    expect(bytes.length).to.be.equal(2 + context.length * 2)
    expect(result).to.be.equal(context)
  })

  it('Convert with bytesToString start and length feature', function () {
    const start = 'Welcome '
    const context = 'to'
    const end = ' use sct'
    const str = start + context + end
    const bytes = stringToBytes(str)
    const result = bytesToString(bytes, start.length, context.length)

    expect(bytes.startsWith('0x')).to.be.true
    expect(bytes.length).to.be.equal(2 + str.length * 2)
    expect(result).to.be.equal(context)
  })
})
