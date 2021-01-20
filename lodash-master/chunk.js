import slice from './slice.js'
import toInteger from './toInteger.js'

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size = 1) {
  // toInteger(size)方法可以将size转换为整数，如果size不能转换成Number类型，toInteger就会把它转成0;
  size = Math.max(toInteger(size), 0)
  // 如果array是null或者undefined，length就是0；如果array是boolean类型或者Number类型，length就是undefined;
  const length = array == null ? 0 : array.length
  // array类型是：Boolean、undefined、null、Number的话就返回[];注意：直接写123.length|undefined.length|null.length是报错，但是变量.length就不报错。true.length|false.length === undefined
  // size 如果不能转换成Number类型，或者小于1，就返回[];
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  // 这里先使用new Array让result成为一个固定长度的空数组，可能会比直接让它成为一个空数组性能更高一些;
  const result = new Array(Math.ceil(length / size))
  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

export default chunk
