// utils/log.js
'use strict'

import log4js from 'log4js'
/**
 * 日记
 */
class Log {
  constructor() {
    log4js.configure({
      appenders: {
        file: {
          type: 'dateFile',
          filename: process.cwd() + '/logs/e',
          pattern: 'yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          category: 'logger'
        }
      },
      categories: {
        default: {
          appenders: ['file'],
          level: 'debug'
        }
      },
      pm2: true,
      pm2InstanceVar: 'INSTANCE_ID'
    })

    this.logger = log4js.getLogger('logger')
  }

  info(msg) {
    this.logger.info(msg)
  }

  error(msg) {
    this.logger.error(msg)
  }
}

export default new Log()