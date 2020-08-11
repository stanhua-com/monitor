'use strict'

import ErrorInfo from '../../utils/errorInfo'

export default class Controller {
  constructor() {
    this.errorInfo = ErrorInfo
  }

  /**
   * 通用
   * @param {Context} ctx 
   * @param {Object} msg 
   */
  common(ctx, msg) {
    ctx.body = { code: 1002, data: '', msg: msg }
  }

  /**
   * 长度区间
   * @param {Context} ctx 
   * @param {String} value 
   * @param {Number} min 
   * @param {Number} max 
   */
  rangeLength(ctx, value, min, max) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s长度必须在%s-%s位之间', value, min, max)
    }
  }

  /**
   * 长度最小
   * @param {Context} ctx 
   * @param {String} value 
   * @param {Number} min 
   */
  minLength(ctx, value, min) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s长度最小为%s', value, min)
    }
  }

  /**
   * 长度最大
   * @param {Context} ctx 
   * @param {String} value 
   * @param {Number} max 
   */
  maxLength(ctx, value, max) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s长度最多为%s', value, max)
    }
  }

  /**
   * 值区间
   * @param {Context} ctx 
   * @param {String} value 
   * @param {Number} min 
   * @param {Number} max 
   */
  rangeValue(ctx, value, min, max) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s值必须在%s-%s之间', value, min, max)
    }
  }

  /**
   * 最小
   * @param {Context} ctx 
   * @param {String} value 
   * @param {Number} min 
   */
  minValue(ctx, value, min) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s值不能小于%s', value, min)
    }
  }

  /**
   * 最大
   * @param {Context} ctx 
   * @param {String} value 
   * @param {Number} max 
   */
  maxValue(ctx, value, max) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s值不能大于%s', value, max)
    }
  }

  /**
   * 纯数字
   * @param {Context} ctx 
   * @param {String} value 
   */
  pureNumber(ctx, value) {
    ctx.body = {
      code: 1002,
      data: '',
      msg: ErrorInfo.util.format('%s为纯数字', value)
    }
  }

  /**
   * 是否为空
   * @param {Context} ctx 
   * @param {String} value 
   */
  isEmpty(value) {
    return value === undefined || value === null || value === ''
  }
}