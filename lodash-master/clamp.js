/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @since 4.0.0
 * @category Number
 * @param {number} number The number to clamp.
 * @param {number} lower The lower bound.
 * @param {number} upper The upper bound.
 * @returns {number} Returns the clamped number.
 * @example
 *
 * clamp(-10, -5, 5)
 * // => -5
 *
 * clamp(10, -5, 5)
 * // => 5
 */
// clamp 可以传入一个 number ，并且可以设定下限 lower 和上限 upper，如果 number 在上限和下限之前，则返回 number，如果低于下限，则返回下限值，如果高于上限，则返回上限值。
function clamp(number, lower, upper) {
  // 将传入的参数转换成number类型
  // +{} => NaN
  // +[] => 0
  // +null => 0
  // +true => 1
  // +undefined => NaN
  number = +number
  lower = +lower
  upper = +upper
  // 处理lower、upper是NaN的情况，如果是NaN，则取0
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  // 处理number是NaN的情况
  // 是：返回NaN
  // 否：1. number在上下边界之间，返回number；2. number大于上界，返回上界；3. number小于下界，返回下界。
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}

export default clamp
