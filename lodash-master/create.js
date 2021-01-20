/**
 * Creates an object that inherits from the `prototype` object. If a
 * `properties` object is given, its own enumerable string keyed properties
 * are assigned to the created object.
 *
 * @since 2.3.0
 * @category Object
 * @param {Object} prototype The object to inherit from.
 * @param {Object} [properties] The properties to assign to the object.
 * @returns {Object} Returns the new object.
 * @example
 *
 * function Shape() {
 *   this.x = 0
 *   this.y = 0
 * }
 *
 * function Circle() {
 *   Shape.call(this)
 * }
 *
 * Circle.prototype = create(Shape.prototype, {
 *   'constructor': Circle
 * })
 *
 * const circle = new Circle
 * circle instanceof Circle
 * // => true
 *
 * circle instanceof Shape
 * // => true
 */
// create 方法类似于 Object.create ，但是第二个参数和 Object.create 稍有不同， Object.create 要求传入的是属性描述，但是 create 方法传入的是对象。
function create(prototype, properties) {
  // prototype是null就取null，否则就转成对象
  prototype = prototype === null ? null : Object(prototype)
  // 创建一个原型对象是prototype的空对象
  const result = Object.create(prototype)
  // 没有第二个参数或者第二个参数是null，则直接返回该对象
  // 否则将result和properties的属性合并，并返回
  return properties == null ? result : Object.assign(result, properties)
}

export default create
