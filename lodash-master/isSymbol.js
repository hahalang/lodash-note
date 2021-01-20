import getTag from './.internal/getTag.js'

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
// 1. 判断是否是Symbol类型，是就返回true
/** 
*  2. 判断下面这种情况:
*  const symbol = Symbol()
*  typeof Object(symbol) // 'object'
*  Object.prototype.toString.call(Object(symbol)) // '[object Symbol]'
**/
function isSymbol(value) {
  const type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}

export default isSymbol
