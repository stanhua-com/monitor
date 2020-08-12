'use strict'

import Controller from './index'

import System from '../services/system'

class SystemController extends Controller {
  constructor() {
    super()

  }

  /**
   * 操作系统信息
   */
  info(ctx, next) {
    ctx.body = { code: 200, msg: '', data: System.info() }
  }

  /**
   * 使用率
   */
  async usage(ctx, next) {
    ctx.body = { code: 200, msg: '', data: await System.usage() }
  }
}

export default new SystemController()