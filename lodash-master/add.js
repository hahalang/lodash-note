import createMathOperation from './.internal/createMathOperation.js'

/**
 * Adds two numbers.
 *
 * @since 3.4.0
 * @category Math
 * @param {number} augend The first number in an addition.
 * @param {number} addend The second number in an addition.
 * @returns {number} Returns the total.
 * @example
 *
 * add(6, 4)
 * // => 10
 */
// createMathOperation 是一个高阶函数：一个函数可以接收另一个函数作为参数，该函数就称为高阶函数。
const add = createMathOperation((augend, addend) => augend + addend, 0)

export default add
