## `lodash` 源码之 `baseGet`

> 内部函数

#### 一. 依赖项

```js
import castPath from './castPath.js';
import toKey from './toKey.js';
```

**[《lodash 源码之 castPath》](./castPath.md)**
**[《lodash 源码之 toKey》](./toKey.md)**

#### 二. 源码分析

##### 源码

```js
function baseGet(object, path) {
  // 首先将参数传入`castPath`方法，得到处理后的`path`（长这样：`['a', 'b', 'c']`）;
  path = castPath(path, object)

  let index = 0
  const length = path.length

  // 实际上具体过程是这样的，以path === ['a', 1, 'b']举例：
  // toKey方法是将path的每一项转成string形式，即将key转成string，再去取值;
  // 第一次循环：object = object['a'];
  // 第二遍循环：object = object['a']['1'];
  // 最后：     object = object['a']['1']['b'];
  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  // 情况1：如果index === length，也就是path可以取到最深那层的属性值，就返回取得的属性值；
  // 情况2：如果循环取值的过程中出现某一层没有该属性/属性值是undefined，就返回undefined；
  return (index && index == length) ? object : undefined
}
```
`baseGet`可以根据`a.b.c`这样的路径取得`object`的属性值。
