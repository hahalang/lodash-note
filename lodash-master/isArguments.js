import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */

 // 判断value是否是arguments对象
function isArguments(value) {
  // 类对象 && Object.prototype.toString.call(value) === '[object Arguments]'
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}

export default isArguments
