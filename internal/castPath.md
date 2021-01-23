## `lodash` 源码之 `castPath`

> 内部函数

#### 一. 依赖项

```js
import isKey from './isKey.js';
import stringToPath from './stringToPath.js';
```

**[《lodash 源码之 isKey》](./isKey.md)**
**[《lodash 源码之 stringToPath》](./stringToPath.md)**

#### 二. 源码分析

##### 源码

```js
function castPath(value, object) {
  // 如果value是数组就直接返回value
  if (Array.isArray(value)) {
    return value
  }
  // 满足isKey，即是正常的属性名，就返回value的数组形式;
  // 不满足isKey，像a.b.c这种写法，就交给stringToPath处理成['a', 'b','c']这种形式。
  return isKey(value, object) ? [value] : stringToPath(value)
}
```
该方法是返回数组形式的属性路径，如`value === 'a'`，则返回`['a']`；`value === 'a.b.c'`，就返回`['a', 'b', 'c']`。