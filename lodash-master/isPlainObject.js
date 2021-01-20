import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 */
// 检查 value 是否是普通对象。 也就是说该对象由 Object 构造函数创建，或者 [[Prototype]] 为 null
function isPlainObject(value) {
  // 如果不是类对象或者Object.prototype.toString.call(value) !== '[object Object]'
  if (!isObjectLike(value) || getTag(value) != '[object Object]') {
    return false
  }
  // 如果value = Object.create(null)
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

export default isPlainObject
