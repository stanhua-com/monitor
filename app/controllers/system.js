'use strict'

import os from 'os'

import Controller from './index'

import Utils from '../../utils'

class SystemController extends Controller {
  constructor() {
    super()

  }

  /**
   * 操作系统信息
   */
  info(ctx, next) {
    ctx.body = {
      code: 200, msg: '', data: {
        platform: os.platform(),
        homedir: os.homedir(),
        release: os.release(),
        tmpdir: os.tmpdir(),
        uptime: os.uptime(),
        processtime: process.uptime(),
        type: os.type(),
        arch: os.arch(),
        hostname: os.hostname(),
        loadavg: os.loadavg(),
        cpus: os.cpus(),
        networkInterfaces: os.networkInterfaces(),
        endianness: os.endianness(),
        totalmem: os.totalmem() / 1024 / 1024,
        freemem: os.freemem() / 1024 / 1024,
        userInfo: os.userInfo()
      }
    }
  }

  /**
   * 使用率
   */
  async usage(ctx, next) {
    console.log(process.memoryUsage().rss)

    let stats1 = this.CPUInfo()
    let startIdle = stats1.idle
    let startTotal = stats1.total

    await Utils.sleep(500)

    let stats2 = this.CPUInfo()
    let perc = (stats2.idle - startIdle) / (stats2.total - startTotal)

    ctx.body = {
      code: 200, msg: '', data: {
        cpu: perc,
        freemem: os.freemem() / 1024 / 1024,
        uptime: os.uptime(),
      }
    }
  }

  CPUInfo() {
    const cpus = os.cpus()

    let user = 0
    let nice = 0
    let sys = 0
    let idle = 0
    let irq = 0

    for (let cpu in cpus) {
      if (!cpus.hasOwnProperty(cpu)) continue
      user += cpus[cpu].times.user
      nice += cpus[cpu].times.nice
      sys += cpus[cpu].times.sys
      irq += cpus[cpu].times.irq
      idle += cpus[cpu].times.idle
    }

    return { idle, total: user + nice + sys + idle + irq }
  }
}

export default new SystemController()