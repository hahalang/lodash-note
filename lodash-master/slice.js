/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 */

// https://segmentfault.com/a/1190000010680849

function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  // array === [] | null | undefined，返回[]
  if (!length) {
    return []
  }
  // 赋默认值：
  // start: 0
  // end: array.length
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  // start < 0，-start > length的话就取0，否则从后往前数
  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  // 1. end > length，end = array.length
  // 2. end < 0, 从后往前数
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }

  // 无符号位移运算 x >>> 0, 本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0～0xFFFFFFFF）,且在无意义的情况下缺省值为0
  // js数组最大长度是2^32-1
  // -1 >>> 0  // 4294967295
  // 0 >>> 0  // 0
  // '1' >>> 0  // 1
  // '1x' >>> 0  // 0
  // null >>> 0  // 0
  length = start > end ? 0 : ((end - start) >>> 0)
  // start = start >>> 0
  start >>>= 0

  // 1， 使用while，比自己用for循环更简单
  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice

// 移位运算符在移位前做了两种转换:
// 1. 将不是number类型的数据转换成number；
// 2. 将number转成无符号的32bit数据，即Unit32类型
// 这些与移位的位数无关，移位0位主要就是为了js的内部特性做了前两种转换

// Unit32类型是如何转换的
// 1. 如果不能转成number类型，那就为0
// 2. 如果为非整数，先转为整数
// 3. 如果是正数，返回正数
// 4. 如果是负数，返回负数+(2^32)