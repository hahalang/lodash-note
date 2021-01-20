import baseToNumber from './baseToNumber.js'
import baseToString from './baseToString.js'

/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(operator, defaultValue) {
  /* value和other是调用createMathOperation函数后被赋值的变量a, 执行后传入的参数。如：const add = createMathOperation((augend, addend) => augend + addend, 0)，add(6, 4)。其中add就是那个变量，value和other就是传入的参数 */
  return (value, other) => {
    // 如果执行add函数时不传参。add() => 0
    if (value === undefined && other === undefined) {
      return defaultValue
    }
    // 如果执行add函数时只传一个参数，返回该参数。add(1) => 1
    if (value !== undefined && other === undefined) {
      return value
    }
    if (other !== undefined && value === undefined) {
      return other
    }
    // 如果传入的参数含有字符串，就把两个参数都转换成string类型。add(1, '1') => '11'
    if (typeof value === 'string' || typeof other === 'string') {
      value = baseToString(value)
      other = baseToString(other)
    }
    else {  // 否则就转换成number类型
      value = baseToNumber(value)
      other = baseToNumber(other)
    }
    // 将转换好的参数传入调用createMathOperation函数时传入的operator函数
    return operator(value, other)
  }
}

export default createMathOperation
