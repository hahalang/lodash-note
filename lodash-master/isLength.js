/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * isLength(3)
 * // => true
 *
 * isLength(Number.MIN_VALUE)
 * // => false
 *
 * isLength(Infinity)
 * // => false
 *
 * isLength('3')
 * // => false
 */
function isLength(value) {
  // length属性必须number类型
  // length至少是0，所以必须大于-1
  // length必须是整数：value % 1 == 0
  // length必须在js所能表达的最大整数范围内
  return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

export default isLength
