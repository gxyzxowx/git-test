
/**
 * 金额格式化
 */
export const setChar = (str) => {
  let newStr = (str * 1).toFixed(2)
  let num = newStr.split('')
  num.splice(0, 0, '￥')
  return num.join('')
}
