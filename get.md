## `lodash` 源码之 `get`

> 根据 `object` 对象的 `path` 路径获取值。如果解析 `value` 是 `undefined` 会以 `defaultValue` 取代。

#### 一. 方法介绍

- **参数**
  1. `object`: `Object`; 要检索的对象;
  2. `path`: `Array|string`; 要获取属性的路径;
  3. `[defaultValue]`: `any`; 如果解析值是 undefined ，这值会被返回;
- **返回值**
  `any`，解析的值;

#### 二. 使用示例

```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

#### 三. 依赖项

```js
import baseGet from './.internal/baseGet.js'
```

**[《lodash 源码之 createMathOperation》](./internal/baseGet.md)**

#### 四. 源码分析

##### 源码

```js
function get(object, path, defaultValue) {
  // 如果object传入null或不传，就给它赋undefined；
  // 否则就将`baseGet`方法的返回赋给它
  const result = object == null ? undefined : baseGet(object, path)
  // result是undefined的话就返回默认值；
  // 否则返回baseGet处理的结果
  return result === undefined ? defaultValue : result
}
```
`lodash`的`get`方法能帮助我们避免像`undefined.name`这种直接抛错的情况。
如果`object`传入`null`或不传，就返回`undefined`，其他情况：**[《lodash 源码之 createMathOperation》](./internal/baseGet.md)**
