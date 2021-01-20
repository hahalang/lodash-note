import isSymbol from '../isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  // 如果是字符串或者Symbol类型就直接返回value
  if (typeof value === 'string' || isSymbol(value)) {
    return value
  }
  const result = `${value}`
  // `${-0}` => '0'。这里是对value === -0做判断，如果是-0，就返回'-0'，别的情况直接返回各自的字符串形式
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default toKey
