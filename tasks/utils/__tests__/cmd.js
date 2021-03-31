const { addParam, addParams, addFlag, addFlags, addValues } = require('../cmd')

describe('addParam', () => {
  it('should return a key value pair', () => {
    expect(
      addParam('foo', 2)
    ).toEqual('--foo 2')

    expect(
      addParam('foo', 0)
    ).toEqual('--foo 0')

  })

  it ('should return empty string for no value', () => {
    expect(
      addParam('foo', undefined)
    ).toEqual('')
  })
})

describe('addParams', () => {
  it('should return a key value pair', () => {
    expect(
      addParams({ a: 'foo', b: 'bar'})
    ).toEqual('--a foo --b bar')
  })

  it ('should return empty string for no value', () => {
    expect(
      addParams({})
    ).toEqual('')
  })
})


describe('addFlag', () => {
  it('should return a flag string', () => {
    expect(
      addFlag('foo', true)
    ).toEqual('--foo')


  })

  it ('should return empty string for no value', () => {
    expect(
      addFlag('foo', false)
    ).toEqual('')
  })
})

describe('addFlags', () => {
  it('should return a flag string', () => {
    expect(
      addFlags({ a: true, b: false})
    ).toEqual('--a')
  })

  it ('should return empty string for no value', () => {
    expect(
      addFlags({})
    ).toEqual('')
  })
})

describe('addValues', () => {
  it('should work with arrays', () => {
    expect(
      addValues(['foo','bar'])
    ).toEqual('foo bar')
  })

  it ('should work for string input', () => {
    expect(
      addValues('foo,bar,baz')
    ).toEqual('foo bar baz')
  })

  it('should return empty string for everything else', () => {
    expect(
      addValues(22)
    ).toEqual('')
  })
})