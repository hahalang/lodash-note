import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'
import nodeTypes from './.internal/nodeTypes.js'

/* Node.js helper references. */
const nodeIsArrayBuffer = nodeTypes && nodeTypes.isArrayBuffer

/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * isArrayBuffer(new ArrayBuffer(2))
 * // => true
 *
 * isArrayBuffer(new Array(2))
 * // => false
 */

/* 
 ArrayBuffer类型介绍： https://zhuanlan.zhihu.com/p/97768916  https://www.cnblogs.com/chris-oil/p/8615559.html
*/

// 1. node环境通过
// 2. 非node环境：是类对象&Object.prototype.toString.call(value) == '[object ArrayBuffer]';
const isArrayBuffer = nodeIsArrayBuffer
  ? (value) => nodeIsArrayBuffer(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object ArrayBuffer]'

export default isArrayBuffer
