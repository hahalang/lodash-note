## `lodash` 源码之 `memoize`

> 

#### 一. 依赖项
无

#### 二. 源码分析

##### 源码

```js
const MAX_MEMOIZE_SIZE = 500

function memoizeCapped(func) {
  const result = memoize(func, (key) => {
    const { cache } = result
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear()
    }
    return key
  })

  return result
}
```
该方法实际调用的`memoize`方法。作用是限制缓存的数量，避免缓存太大，内存占用过多。设置最大的缓存数量是`500`。