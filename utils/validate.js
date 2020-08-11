'use strict'

/**
 * 特殊字符
 */
export function ValidateSpecialChar(value) {
  return /[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(value)
}

/**
 * 密码
 */
export function ValidatePassword(value) {
  return /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/.test(value)
}

/**
 * 手机号码
 */
export function ValidatePhoneNumber(value) {
  return /^1[3456789]\d{9}$/.test(value)
}

/**
 * 电话号码
 */
export function ValidateTelephone(value) {
  return /^0\d{2,3}-?\d{7,8}$/.test(value)
}

/**
 * 联系电话
 */
export function ValidateContact(value) {
  return ValidatePhoneNumber(value) || ValidateTelephone(value)
}

/**
 * 邮箱
 */
export function ValidateEmail(value) {
  return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
}

/**
 * 身份证
 */
export function ValidateIdCard(value) {
  return /^\d{15}$|^\d{17}[0-9Xx]$/.test(value)
}

/**
 * 邮政编码
 */
export function ValidateZipcode(value) {
  return /^[1-9][0-9]{5}$/.test(value)
}

/**
 * 金额
 */
export function ValidateMomey(value) {
  return /^-?\d*(\.\d{0,2})?$/.test(value)
}

/**
 * 纯数字
 */
export function ValidatePureNumber(value) {
  return /^[0-9]*$/.test(value)
}

/**
 * 车牌号
 */
export function ValidateCarNumber(value) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(value)
}

/**
 * 中文
 */
export function ValidateChinese(value) {
  return /[\u4E00-\u9FA5]/.test(value)
}

/**
 * 表情符号
 */
export function ValidateEmoji(value) {
  return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value)
}

/**
 * 货币格式
 */
export function currencyFormat(value) {
  value = value.replace(/\,/g, '')
  return value.replace(/(?!^)(?=(\d{3})+$)/g, ',')
}

/**
 * 手机格式
 */
export function phoneFormat(value) {
  value = Validate.trim(value)
  return value.replace(/(?!^)(?=(\d{4})+$)/g, ' ')
}

/**
 * 清除所有空格
 */
export function trim(value) {
  return value.replace(/\s/g, '')
}