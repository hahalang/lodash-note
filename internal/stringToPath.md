## `lodash` 源码之 `isKey`

> 内部函数

#### 一. 依赖项

```js
import memoizeCapped from './memoizeCapped.js';
```

**[《lodash 源码之 memoizeCapped》](./memoizeCapped.md)**

#### 二. 源码分析

##### 源码

```js
const charCodeOfDot = '.'.charCodeAt(0)
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  '\\[(?:' +
    // Match a non-string expression.
    '([^"\'][^[]*)' + '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]'+ '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g')

// rePropName = [^.[\]]+|\[(?:([^"'][^[]*)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))"

const stringToPath = memoizeCapped((string) => {
  const result = []
  // 第一个字符是‘.’，则最外层的路径是空字符串
  // 这里使用charCodeAt的写法比之前使用正则/^\./的写法性能更好，所以这里后来改成了这种写法
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('')
  }

  // 这一块的正则处理比较复杂。
  // replace方法的传入正则时，第二参数传入函数时，该函数的形参具体表示的意义可以参看MDN
  // 正则不熟悉可以看我的正则读书笔记最后一章

  // 情况1: a.b.c这种情况，只有match有值，正则就匹配三次，每一次对应的match值分别是'a','b','c'。result = ['a', 'b', 'c']
  // 情况2: a[0].b这种情况，match和expression都有值，expression是正则捕获的第一个括号分组匹配的字符，result = ['a', 0, 'b']
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match
    if (quote) {
      key = subString.replace(reEscapeChar, '$1')
    }
    else if (expression) {
      key = expression.trim()
    }
    result.push(key)
  })
  return result
})
```
该方法是将字符串形式的深层路径转成数组形式，如`a.b.c`，转成`['a','b','c']`。

##### 附录
* **[String.prototype.replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)**
* **[正则表达式读书笔记](https://github.com/hahalang/RegExp-note)**