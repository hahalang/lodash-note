/**
 * The opposite of `before`. This method creates a function that invokes
 * `func` once it's called `n` or more times.
 *
 * @since 0.1.0
 * @category Function
 * @param {number} n The number of calls before `func` is invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * const saves = ['profile', 'settings']
 * const done = after(saves.length, () => console.log('done saving!'))
 *
 * forEach(saves, type => asyncSave({ 'type': type, 'complete': done }))
 * // => Logs 'done saving!' after the two async saves have completed.
 */
// 此方法创建一个函数，当他被调用n或更多次之后将马上触发func
/* 
  例子：
  var finished = () => {
    console.log('Holy sh*t I finished it')
  }
  var code = after(3, finished)
  code() // ...
  code() // ...
  code() // 'Holy sh*t I finished it'
*/
function after(n, func) {
  // 判断传入的func是不是函数，不是就抛出错误
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  // 如果Boolean(n) === true，返回n，否则返回0
  n = n || 0
  return function(...args) {
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}

export default after
