## `lodash` 源码之 `isKey`

> 内部函数

#### 一. 依赖项

```js
import isSymbol from "../isSymbol.js";
```

**[《lodash 源码之 isSymbol》](../isSymbol.md)**

#### 二. 源码分析

##### 源码

```js
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;

function isKey(value, object) {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}
```
该方法是检验`value`是否是一个合法的属性名。

##### 分析
* **传入数组，返回`false`**
```js
if (Array.isArray(value)) {
    return false
}
```

* **传入其他合法的属性名类型**
```js
if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true
}
```
对于数值、布尔、`null`作为属性名是，会被隐式转换成`string`类型。
`Symbol`类型可以直接作为属性名。

* **传入字符串**
```js
return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
```
`reIsPlainProp`这个正则是判断传入的是否是单词字符串，如：`abcd`、`a_d`等；是则返回`true`;
`reIsDeepProp`这个正则比较复杂，其实就是判断传入的是不是`a.b.c`这种情况，因为`get`方法为了获取深层属性，会这么传。如果是这种形式就返回`!true`，即`false`；
如果传入两个参数，并且`value`是`object`的属性的话，就返回`true`。