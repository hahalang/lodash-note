import isSymbol from '../isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/** Used to convert symbols to primitives and strings. */
const symbolToString = Symbol.prototype.toString

/**
 * The base implementation of `toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // 如果是字符串就直接返回
  if (typeof value === 'string') {
    return value
  }
  // 如果是数组，就将数组每一项都提取出来。`${[1, '2', 3].map(item => item)}` => `${[1, '2', 3]}` => '1,2,3'，实际上是${}起的作用
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map(baseToString)}`
  }
  // 如果是Symbol类型,将Symbol装换成字符串。
  // 如：Symbol.prototype.toString.call(Symbol()) => "Symbol()"
  // Symbol.prototype.toString.call(Symbol.iterator) => "Symbol(Symbol.iterator)"
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result = `${value}`
  // `${-0}` => '0'。这里是对value === -0做判断，如果是-0，就返回'-0'，别的情况直接返回各自的字符串形式
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default baseToString
