'use strict'

import util from 'util'

class errorInfo {
  constructor() {
  }

  /**
   * 未知错误
   */
  unknown() {
    return { code: -1, data: '', msg: '未知错误' }
  }

  /**
   * 未找到
   */
  notfound() {
    return { code: 400, data: '', msg: '未找到' }
  }

  /**
   * 权限认证失败
   */
  unauthorized() {
    return { code: 401, data: '', msg: '权限认证失败' }
  }

  /**
   * 内部服务器错误
   */
  serverError() {
    return { code: 500, data: '', msg: '服务器开小差了，请稍后再次' }
  }

  /**
   * 没有相关数据
   */
  nodata() {
    return { code: 1000, data: '', msg: '没有相关数据' }
  }

  /**
   * 必填
   * @param {Strig} value 
   */
  required(value) {
    return { code: 1001, data: '', msg: util.format('%s不能为空', value) }
  }

  /**
   * 已存在
   * @param {Strig} value 
   */
  found(value) {
    return { code: 1002, data: '', msg: util.format('%s已存在', value) }
  }

  /**
   * 字段无效
   * @param {Strig} value 
   */
  invalid(value) {
    return { code: 1003, data: '', msg: util.format('%s值为无效', value) }
  }

  /**
   * 不匹配
   * @param {Strig} value1 
   * @param {Strig} value2 
   */
  unmatch(value1, value2) {
    return { code: 1004, data: '', msg: util.format('%s和%s不匹配', value1, value2) }
  }

  /**
   * 不存在
   * @param {Strig} value 
   */
  unexist(value) {
    return { code: 1005, data: '', msg: util.format('%s不存在', value) }
  }

  /**
   * 格式有误
   * @param {Strig} value 
   */
  wrongFormat(value) {
    return { code: 1006, data: '', msg: util.format('%s格式有误', value) }
  }

  /**
   * 不正确
   * @param {Strig} value 
   */
  inCorrect(value) {
    return { code: 1007, data: '', msg: util.format('%s不正确', value) }
  }
}

export default new errorInfo()