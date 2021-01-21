## `lodash` 源码之 `isSymbol`

> 检查 `value` 是否是原始 `Symbol` 或者对象

#### 一. 方法介绍

- **参数**
  1. `value`: `any`; 要检查的值;
- **返回值**
  `boolean`，如果 `value` 为一个 `symbol`，那么返回 `true`，否则返回 `false`;

#### 二. 使用示例

```js
_.isSymbol(Symbol.iterator);
// => true
 
_.isSymbol('abc');
// => false
```

#### 三. 依赖项

```js
import getTag from './.internal/getTag.js';
```

**[《lodash 源码之 getTag》](./getTag.md)**

#### 四. 源码分析

##### 源码

```js
function isSymbol(value) {
  const type = typeof value
  return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
}
```
***

##### 分析
* **`typeof`判断就是`symbol`类型**
```js
return type == 'symbol'
```
直接返回`true`

* **`typeof`判断是`object`类型**
```js
return type === 'object' && value != null && getTag(value) == '[object Symbol]'
```
如果是`object`类型，且不为`null`，并且`Object.prototype.toString.call(value) === '[object Symbol]'`，则返回`true`。
其实就是为了判断下面这种情况：
```js
const symbol = Symbol();
typeof Object(symbol) // 'object'
Object.prototype.toString.call(Object(symbol)) // '[object Symbol]'
```
* **其他情况返回`false`**