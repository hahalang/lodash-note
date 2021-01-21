## `lodash` 源码之 `createMathOperation`

> 内部函数

#### 一. 依赖项

```js
import baseToNumber from "./baseToNumber.js";
import baseToString from "./baseToString.js";
```

**[《lodash 源码之 baseToNumber》](./baseToNumber.md)**
**[《lodash 源码之 baseToString》](./baseToString.md)**

#### 二. 源码分析

##### 源码

```js
function createMathOperation(operator, defaultValue) {
  return (value, other) => {
    if (value === undefined && other === undefined) {
      return defaultValue;
    }
    if (value !== undefined && other === undefined) {
      return value;
    }
    if (other !== undefined && value === undefined) {
      return other;
    }
    if (typeof value === "string" || typeof other === "string") {
      value = baseToString(value);
      other = baseToString(other);
    } else {
      value = baseToNumber(value);
      other = baseToNumber(other);
    }
    return operator(value, other);
  };
}
```

`createMathOperation`函数接收两个参数：函数`operator`，默认值`defaultValue`，并返回一个函数。
返回的函数接收两个参数`value`、`other`，先对传入的参数进行处理，再将处理后的参数传给函数`operator`，最终返回`operator`函数执行的结果。

---

##### 分析

- **`value`和`other`同时为`undefined`**

```js
if (value === undefined && other === undefined) {
  return defaultValue;
}
```

当我们没有传入`value`和`other`这两个参数时，就返回默认值`defaultValue`。

- **只有`other`为`undefined`**

```js
if (value !== undefined && other === undefined) {
  return value;
}
```

当只传入一个参数`value`时，就返回`value`。

- **只有`value`为`undefined`**

```js
if (other !== undefined && value === undefined) {
  return other;
}
```

当只传入一个参数`other`时，就返回`other`。

- **`other`或`value`为`string`类型**

```js
if (typeof value === "string" || typeof other === "string") {
  value = baseToString(value);
  other = baseToString(other);
}
```

传入了两个参数，只要参数含有`string`类型，就将参数都转成`string`类型。

- **其他情况**

```js
else {
  value = baseToNumber(value);
  other = baseToNumber(other);
}
```

传入了两个参数，只要参数不含`string`类型，就将参数都转成`number`类型。

最后，将处理好的参数交给`operator`函数(我们自己传入)处理。
