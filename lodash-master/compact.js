/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 */
function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  // 自己实现的时候考虑得不全面，使用forEach，导致传入String类型得时候报错。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构
  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}

export default compact
