## `lodash` 源码之 `baseToNumber`

> 内部函数

#### 一. 依赖项

```js
import isSymbol from "../isSymbol.js";
```

**[《lodash 源码之 isSymbol》](../isSymbol.md)**

#### 二. 源码分析

##### 源码

```js
function baseToNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  return +value;
}
```

`baseToNumber`是将参数转换成`number`类型，但是对于二进制、八进制或者十六进制形式的字符串，不能保证可以正确处理成`number`类型。这么做的目的是为了性能，避免做太多无效的判断。

---

##### 分析

- **`value`是`number`类型**

```js
if (typeof value === "number") {
  return value;
}
```

如果`value`是`number`类型，就直接返回`value`。

- **`value`是`symbol`类型**

```js
if (isSymbol(value)) {
  return NAN;
}
```

将`symbol`隐式转换成`number`类型会报错。所以对于`symbol`类型就直接返回`NaN`。

- **其他情况**

```js
return +value;
```

其他情况就使用`+value`进行转换。

`+value`结果:
```js
+undefined      // => NaN
+{}             // => NaN
+function(){}   // => NaN
+'a'            // => NaN
+'1'            // => 1
+true           // => 1
+false          // => 0
+[]             // => 0
+null           // => 0
```
