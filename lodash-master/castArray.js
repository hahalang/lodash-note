
/**
 * Casts `value` as an array if it's not one.
 *
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * castArray(1)
 * // => [1]
 *
 * castArray({ 'a': 1 })
 * // => [{ 'a': 1 }]
 *
 * castArray('abc')
 * // => ['abc']
 *
 * castArray(null)
 * // => [null]
 *
 * castArray(undefined)
 * // => [undefined]
 *
 * castArray()
 * // => []
 *
 * const array = [1, 2, 3]
 * console.log(castArray(array) === array)
 * // => true
 */
// castArray 会将传入的 value 转换成数组返回，如果传入的 value 已经是数组，则返回原值。
function castArray(...args) {
  // 没有传入参数，则返回[]
  if (!args.length) {
    return []
  }
  // 该方法只能传入一个参数，所以取args[0]
  // args[0]本身就是数组，则返回自身；否则返回它的数组形式[args[0]]
  const value = args[0]
  return Array.isArray(value) ? value : [value]
}

export default castArray
