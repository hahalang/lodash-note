## `lodash` 源码之 `baseToString`

> 内部函数

#### 一. 依赖项

```js
import isSymbol from "../isSymbol.js";
```

**[《lodash 源码之 isSymbol》](./isSymbol.md)**

#### 二. 源码分析

##### 源码

```js
const INFINITY = 1 / 0
const symbolToString = Symbol.prototype.toString

function baseToString(value) {
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return `${value.map(baseToString)}`
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}
```

`baseToString`是将参数转换成`string`类型，不直接用`toString`，是出于性能的考虑。

---

##### 分析

- **`string` 类型就直接返回**

```js
if (typeof value === 'string') {
    return value
}
```
- **`value` 是数组**
```js
if (Array.isArray(value)) {
    return `${value.map(baseToString)}`
}
```
如果 `value` 是数组，就将数组每一项进行递归处理，得到的数组使用 `${新数组}` 进行字符串格式化处理。
比如：
```js
`${[1, '2', 3].map(item => item)}` => `${[1, '2', 3]}` => '1,2,3'
```
实际上`${[1, 2, 3]}`的处理结果同`[1, 2, 3].join()`，都是`'1,2,3'`。
- **`value`是`Symbol`类型**

```js
if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
}
```
支持`Symbol.prototype.toString`方法的话，就使用该方法将`value`转成字符串；否则直接返回空字符串。
`Symbol.prototype.toString`的返回结果：
```js
Symbol.prototype.toString.call(Symbol()) => "Symbol()"
Symbol.prototype.toString.call(Symbol.iterator) => "Symbol(Symbol.iterator)"
```

* **`value`是`-0`**
```js
const result = `${value}`;
return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
```
这里是对传入`-0`这种情况做特殊处理，因为：
```js
`${-0}` => '0'
```
所以，如果传入的是数字`-0`的话，就返回字符串`-0`。

* **其他情况**
返回模版字符串`${}`处理后的结果。

***
##### 附录
模版字符串返回值：
```js
`${-0}` => '0'
`${[false, 1, 'tom']}` => 'false,1,tom'
`${{name: 'tom'}}` => '[object Object]'
`${Math}` => '[object Math]' 
`${Symbol()}`  // 报错，TypeError: Cannot convert a Symbol value to a string。所以源码中对symbol类型做了特殊处理
```
其他情况就是正常返回字符串格式。