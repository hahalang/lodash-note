## `lodash` 源码之 `after`

> 此方法创建一个函数，当他被调用 `n` 或更多次之后将马上触发 `func`

#### 一. 方法介绍

- **参数**
  1. `n`: `number`; 次数;
  2. `fn`: `function`; 被调用 `n` 次以后会触发的回调函数;
- **返回值**
  `function`;

#### 二. 使用示例

```js
var finished = () => {
    console.log('Holy sh*t I finished it')
}
var code = after(3, finished)
code() // ...
code() // ...
code() // 'Holy sh*t I finished it'
```

#### 三. 依赖项
无

#### 四. 源码分析

##### 源码

```js
function after(n, func) {
  // 判断传入的func是不是函数，不是就抛出TypeError错误
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  // 给n设置默认值0
  n = n || 0
  return function(...args) {
    // 函数每执行一次，闭包中的n就减1。
    // 减小后的 n < 1，则执行回调函数，并把参数和`this`传进去。 this指向的是外部调用的那个函数的上下文
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}
```