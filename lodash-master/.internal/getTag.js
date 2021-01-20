const toString = Object.prototype.toString

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
// 判断数据类型，用"[Object,XXX]"表示
function getTag(value) {
  // null 或者 undefined，实测中发现toString.call也能判断这两者
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  // 除了null和undefined 
  return toString.call(value)
}

export default getTag
