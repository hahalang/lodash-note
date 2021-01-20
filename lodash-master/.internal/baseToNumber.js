import isSymbol from '../isSymbol.js'

/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/**
 * The base implementation of `toNumber` which doesn't ensure correct
 * conversions of binary, hexadecimal, or octal string values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 */
// 转成Number类型
function baseToNumber(value) {
  // value本身是Number类型
  if (typeof value === 'number') {
    return value
  }
  // 如果是Symbol类型
  if (isSymbol(value)) {
    return NAN
  }
  // 将其它类型转换成Number类型，[] => 0, {} => NaN。可以看成Number(value)
  return +value
}

export default baseToNumber
