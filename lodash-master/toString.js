import isSymbol from './isSymbol.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
function toString(value) {
  // null或者undefined => ''
  if (value == null) {
    return ''
  }
  // Exit early for strings to avoid a performance hit in some environments.
  // string类型直接返回
  if (typeof value === 'string') {
    return value
  }
  // 如果是数组，则将数组的每一项都递归调用toString方法，最后转换成一个字符串数组；
  // 接着模板字符串会将数组的左右括号去除，返回最终的字符串；
  // 注意：`${[1,2]}` === '1,2'
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => other == null ? other : toString(other))}`
  }

  // symbol类型调用自身的toString方法
  // Symbol(1).toString() === "Symbol(1)"
  if (isSymbol(value)) {
    return value.toString()
  }

  const result = `${value}`
  // `${{name: 'tom'}}` === "[object Object]"
  // 这里处理如果传入的是-0，由于`${-0}` === '0'，所以还要增加一个判断 1 / -0 === -INFINITY
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}

export default toString
