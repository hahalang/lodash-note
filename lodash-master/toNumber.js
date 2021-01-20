import isObject from './isObject.js'
import isSymbol from './isSymbol.js'

/** Used as references for various `Number` constants. */
// 0/0可以得到NaN
const NAN = 0 / 0

/** Used to match leading and trailing whitespace. */
// 正则：前后所有的空格
const reTrim = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. */
// 正则：检测形似带符号的16进制字符串，如：+0x1f
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
// 形似二进制的字符串正则，二进制以 0b 开头，后面只能是 0 或者 1
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. */
// 形似八进制的字符串正则，八进制以 0o 开头，后面只能跟 0-7 的数字。
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt

/**
 * Converts `value` to a number.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 */
function toNumber(value) {
  // number类型就直接返回
  if (typeof value === 'number') {
    return value
  }
  // symbol类型直接返回NaN
  if (isSymbol(value)) {
    return NAN
  }
  // 如果是对象
  if (isObject(value)) {
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
    // object 类型有 valueOf 的方法，这个方法可以返回对象的原始值。默认情况下，如果 valueOf 没有返回原始值，则会返回对象本身。
    // eg: Number(1).valueOf() === 1, (() => 2).valueOf() === () => 2;
    
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value
    // 如果value没有valueOf方法，或者valueOf函数返回的还是一个对象，这时候就需要将对象转成字符串
    value = isObject(other) ? `${other}` : other
  }

  if (typeof value !== 'string') {
    return value === 0 ? value : +value
  }

  // 接下来就是处理string类型了
  // 先去除前后空格
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)

  // 二进制和八进制使用parseInt转换
  // 用 parseInt 来转换十六进制中形似 +0x16 或 -0x16 的字符串时，会有bug，这样的字符串，预期应该返回 NAN
  // 其他字符串使用+value来转成number
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

export default toNumber
