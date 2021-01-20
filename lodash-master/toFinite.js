import toNumber from './toNumber.js'

// 无穷
const INFINITY = 1 / 0
// MAX_INTEGER可通过Number.MAX_VALUE获取到，大于MAX_INTEGER代表Infinity
const MAX_INTEGER = 1.7976931348623157e+308

/**
 * Converts `value` to a finite number.
 *
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
// 转换 value 为一个有限数字
function toFinite(value) {
  // 如果不传参或者传0、null、''、NaN、false的话，就返回0
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value)  // 转换成Number类型
  // 正无穷或者负无穷就返回最大或者最小的有限数字
  if (value === INFINITY || value === -INFINITY) {
    const sign = (value < 0 ? -1 : 1)
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0  // 过滤掉NaN
}

export default toFinite
