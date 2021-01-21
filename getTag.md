## `lodash` 源码之 `getTag`

> 内部函数

#### 一. 依赖项
无

#### 二. 源码分析

##### 源码

```js
const toString = Object.prototype.toString
function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}
```

这个方法很简单，实际上就是利用`Object.prototype.toString.call(value)`的返回值来判断具体是那哪种类型，因为我们都知道`typeof null === 'object'`、`typeof [] === 'object'`。
这就提供了一种统一的方法去判断数据类型，而不需要去做繁杂的条件判断来实现。

---

##### 附录


- **`Object.prototype.toString`返回值**

```js
const toString = Object.prototype.toString;

toString.call(null); // [object Null]
toString.call(undefined); // [object Undefined]
toString.call(''); // [object String]
toString.call(false) // [object Boolean]
toString.call([]); // [object Array]
toString.call({});  // [object Object]
toString.call(Math); // [object Math]
toString.call(new Date); // [object Date]
toString.call(Symbol())  // [object Symbol]
```