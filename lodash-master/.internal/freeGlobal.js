/** Detect free variable `global` from Node.js. */
// 浏览器环境下的全局对象是window，该方法可以在node环境里面捕获全局global对象
// 1. global是object类型，且不为null
// 2. 并且global.Object和全局的Object构造函数相同，如果是那大概率就是全局的global对象
// 之所以说是大概率，因为在js中global不是保留词，所以我们可以这么绕过检测
/*
const global = {
    Object
}
*/
const freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global

export default freeGlobal
