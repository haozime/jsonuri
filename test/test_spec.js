'use strict'
// const jsonuri = require('../dist/index')
const jsonuri = require('./jsonuri.1.x')
// {get, set, rm, swap, mv, up, down, insert, walk, normalizePath}

/**
 * jsonuri.get
 */
describe('get', () => {
  let obj = {
    a: 2,
    b: {
      b1: {
        b11: 311,
        b12: 312
      },
      b2: 32
    },
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    NULL: null
  }

  it('object path', () => {
    expect(jsonuri.get(obj, 'b/b1/b11')).toEqual(311)
    expect(jsonuri.get(obj, '/b/b1/b11')).toEqual(311)
    expect(jsonuri.get(obj, '/b/b1/////b11')).toEqual(311)
    expect(jsonuri.get(obj, '/b/b1/b11/')).toEqual(311)
    expect(jsonuri.get(obj, 'b/b1/b11/../')).toEqual({b11: 311, b12: 312})
    expect(jsonuri.get(obj, 'b/b1/b11/../../b2/')).toEqual(32)
    expect(jsonuri.get(obj, 'b/b1/b11/../../b2')).toEqual(32)
  })

  it('array path', () => {
    expect(jsonuri.get(obj, 'list/2')).toEqual(2)
    expect(jsonuri.get(obj, 'list/100')).not.toBeDefined()
    expect(jsonuri.get(obj, 'list/-1')).not.toBeDefined()
  })

  it('error path', () => {
    expect(jsonuri.get(obj, 'oo/xx/yy/zz')).not.toBeDefined()
  })

  it('return null', () => {
    expect(jsonuri.get(obj, 'NULL')).toBeNull()
  })

  it('bad arg', () => {
    expect(jsonuri.get(obj, {foo: 'bar'})).not.toBeDefined()
  })
})

/**
 * jsonuri.set
 */
describe('set', () => {
  let obj
  beforeEach(() => {
    obj = {}
  })
  it('set string', () => {
    jsonuri.set(obj, '/a', '10')
    expect(obj).toEqual({a: '10'})
  })

  it('set object', () => {
    jsonuri.set(obj, '/a/b/c', {foo: 'bar', bar: 'baz'})
    expect(obj).toEqual({a: {b: {c: {bar: 'baz', foo: 'bar'}}}})
    jsonuri.set(obj, '/a/b/c/', {foo: 'bar', bar: 'baz'})
    expect(obj).toEqual({a: {b: {c: {bar: 'baz', foo: 'bar'}}}})
  })

  it('set object', () => {
    jsonuri.set(obj, '/a', {foo: 'bar', bar: 'baz'})
    expect(obj).toEqual({a: {bar: 'baz', foo: 'bar'}})
  })

  it('set array', () => {
    jsonuri.set(obj, '/a/b/5', 10)
    expect(obj, {a: {b: [undefined, undefined, undefined, undefined, 10]}})
  })

  it('set array error path', () => { // bad
    jsonuri.set(obj, '/a/b/-1', 10)
    expect(JSON.parse(JSON.stringify(obj))).toEqual({
      a: {
        b: []
      }
    })
  })
})

/**
 * jsonuri.rm
 */
describe('rm', () => {
  let obj
  beforeEach(() => {
    obj = {
      a: 2,
      b: {
        b1: {
          b11: 311,
          b12: 312
        },
        b2: 32
      },
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      NULL: null
    }
  })

  it('object', () => {
    let ret = jsonuri.rm(obj, '/b')
    // expect(ret).toEqual(true)
    expect(obj).toEqual({a: 2, list: [0, 1, 2, 3, 4, 5, 6, 7, 8], NULL: null})
  })

  it('array will change index', () => {
    jsonuri.rm(obj, 'list/1')
    expect(obj).toEqual({a: 2, b: {b1: {b11: 311, b12: 312}, b2: 32}, list: [0, 2, 3, 4, 5, 6, 7, 8], NULL: null})
  })

  // it('array will keep index if has third arg', () => {
  //   jsonuri.rm(obj, 'list/1', {keepIndex: true})
  //   expect(obj).toEqual({a: 2, list: [0, undefined, 2, 3, 4, 5, 6, 7, 8], NULL: null})
  // })
})
//
/**
 * jsonuri.swap
 */
describe('swap', () => {
  let arr
  beforeEach(() => {
    arr = [0, 1, 2, 3, 4, 5, 6]
  })
  it('normal', () => {
    jsonuri.swap(arr, '/1/', '/3/')
    expect(arr).toEqual([0, 3, 2, 1, 4, 5, 6])
  })

  // it('when index out of range', () => {
  //   jsonuri.swap(arr, '1', '999')
  //   expect(arr).toEqual([0, 1, 2, 3, 4, 5, 6])
  // })

  // it('when index out of range', () => {
  //   jsonuri.swap(arr, '/-1', '/3')
  //   expect(arr).toEqual([0, 1, 2, 3, 4, 5, 6])
  // })
})

describe('up', () => {
  let arr, obj
  beforeEach(() => {
    arr = [0, 1, 2, 3, 4, 5, 6]
  })

  it('mv', () => {
    jsonuri.mv(arr, '/1/', '/3/')
    expect(arr).toEqual([0, 2, 3, 1, 4, 5, 6])
  })

  // TODO 越界
})

describe('up', () => {
  let arr, obj
  beforeEach(() => {
    arr = [0, 1, 2, 3, 4, 5, 6]
  })

  it('mv', () => {
    jsonuri.mv(arr, '/1/', '/3/')
    expect(arr).toEqual([0, 2, 3, 1, 4, 5, 6])
  })

  // TODO 越界
})

describe('mv', () => {
  let arr, obj
  beforeEach(() => {
    arr = [0, 1, 2, 3, 4, 5, 6]
  })

  it('mv', () => {
    jsonuri.mv(arr, '/1/', '/3/')
    expect(arr).toEqual([0, 2, 3, 1, 4, 5, 6])
  })

  // TODO 跨界
})

describe('up', () => {
  let arr, obj
  beforeEach(() => {
    arr = [0, 1, 2, 3, 4, 5, 6]
  })

  it('mv', () => {
    jsonuri.mv(arr, '/1/', '/3/')
    expect(arr).toEqual([0, 2, 3, 1, 4, 5, 6])
  })

  // TODO 越界
})

describe('bad args', () => {
  //it('{}', () => {
  //  expect(safeTrim({})).toEqual('[object Object]')
  //})
  //
  //it('[]', () => {
  //  expect(safeTrim([])).toEqual('')
  //})
  //
  //it('NaN', () => {
  //  expect(safeTrim(NaN)).toEqual('NaN')
  //})
  //
  //it('undefined', () => {
  //  expect(safeTrim(undefined)).toEqual('undefined')
  //})
  //
  //it('null', () => {
  //  expect(safeTrim(null)).toEqual('null')
  //})
  //
  //it('0', () => {
  //  expect(safeTrim(0)).toEqual('0')
  //})
  //
  //it('function', () => {
  //  let fun = () => {}
  //  let ret = safeTrim(fun)
  //  expect(ret).toEqual(String(fun))
  //})
})
