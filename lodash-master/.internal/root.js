// https://github.com/yeyuqiudeng/pocket-lodash/blob/master/internal/root.md

/* global globalThis, self */
import freeGlobal from './freeGlobal.js'

/** Detect free variable `globalThis` */
// 在 node 中有 global 顶层对象，在浏览器环境下有 window 顶层对象，在 worker 中也有 self 顶层对象
// globalThis提供了一个标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身）
const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis

/** Detect free variable `self`. */
// self 在浏览器中大部分情况下指向的是当前 window 引用，而在 worker 中，只有 self 这个顶层全局对象，是没有 window 对象的。
const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self

/** Used as a reference to the global object. */
// 在松散模式下，可以在函数中返回 this 获取全局对象，但是在严格模式下，this 会返回 undefined。因此也可以使用以下代码来获取顶层全局对象Function('return this')()
// 这个顺序也很有意思，首先是 globalThis，因为这有最大的普适性，接着是 global ，因为在 node 的环境中，性能的考量会比浏览器环境更重要。
const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')()

export default root
