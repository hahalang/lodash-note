## `lodash` 源码之 `toKey`

> 内部函数

#### 一. 依赖项

```js
import isSymbol from '../isSymbol.js'
```

**[《lodash 源码之 isSymbol》](../isSymbol.md)**

#### 二. 源码分析

##### 源码

```js
const INFINITY = 1 / 0

function toKey(value) {
  // 如果是字符串或者Symbol类型就直接返回value
  if (typeof value === 'string' || isSymbol(value)) {
    return value
  }
  const result = `${value}`
  // `${-0}` => '0'。这里是对value === -0做判断，如果是-0，就返回'-0'。是利用 1 / -0 结果是负无穷来判断。
  // 别的情况直接返回各自的字符串形式
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}
```
该方法是将一个值转换成符合符合对象的属性，相比于`js`来说做了兼容性处理：
`js`中的数字转换成字符串系统会将数字`-0`转成字符串`0`，`tokey`则会将数字`-0`转成字符串`-0`。
