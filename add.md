## `lodash` 源码之 `add`

> 返回两个数相加的和

#### 一. 方法介绍

- **参数**
  1. `augend`: `number`; 相加的第一个数;
  2. `addend`: `number`; 相加的第二个数;
- **返回值**
  `number`，总和;

#### 二. 使用示例

```js
_.add(4, 6);
// => 10
```

#### 三. 依赖项

```js
import createMathOperation from "./.internal/createMathOperation.js";
```

**[《lodash 源码之 createMathOperation》](./createMathOperation.md)**

#### 四. 源码分析

##### 源码

```js
const add = createMathOperation((augend, addend) => augend + addend, 0);
```

`add` 方法实际上调用的是 `createMathOperation` 这个高阶函数内部返回的函数，所以可以直接看 **[《lodash 源码之 createMathOperation》](./createMathOperation.md)**。

高阶函数：一个函数可以接收另一个函数作为参数，该函数就称为高阶函数。
