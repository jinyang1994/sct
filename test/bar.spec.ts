import { expect } from 'chai'
import bar from '@/bar'

describe('Typescript usage suite', function () {
  it('should be able to execute a test', function () {
    expect(true).to.be.equal(true)
  })

  it('should return expected string', function () {
    expect(bar()).to.be.equal('foo')
  })
})
