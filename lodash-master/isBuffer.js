import root from './.internal/root.js'

/*
    https://github.com/yeyuqiudeng/pocket-lodash/blob/master/isBuffer.md
*/

/** Detect free variable `exports`. */
// 在node环境下会在全局暴露exports对象和module对象
// 1. exports是object类型，且不是null
// 2. exports不是html元素，因为如果将某个元素的id设置为exports，浏览器就会自动增加一个exports变量，指向该元素
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports

/** Detect free variable `module`. */
// 判断原理同exports，但是首先要满足exports存在，Node.js中两个对象肯定是同时存在的
const freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module

/** Detect the popular CommonJS extension `module.exports`. */
// 检测当前环境是否支持CommonJS模块加载机制
// CommonJS规定，exports对象必须是module.exports对象的引用
const moduleExports = freeModule && freeModule.exports === freeExports

/** Built-in value references. */
// 光CommonJs规范还不够，浏览器想要实现也很容易，还需要去检验是否有Buffer对象&&Buffer.isBuffer方法
const Buffer = moduleExports ? root.Buffer : undefined

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined

/**
 * Checks if `value` is a buffer.
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * isBuffer(new Buffer(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */

 // 都满足就把原生的isBuffer方法暴露出去，否则就返回false
const isBuffer = nativeIsBuffer || (() => false)

export default isBuffer
