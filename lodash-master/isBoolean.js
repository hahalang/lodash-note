import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * isBoolean(false)
 * // => true
 *
 * isBoolean(null)
 * // => false
 */
// 1. value === true || false，肯定是Boolean
// 2. 但是如果value是通过构造函数Boolean定义的，则需要通过Object.prototype.toString.call(value) == '[object Boolean]'判断
// var a = new Boolean() => Boolean(false)
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}

export default isBoolean
