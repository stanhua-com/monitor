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

  // #region Linux资源

  /**
   * 查看内存使用量和交换区使用量
   */
  async free(ctx, next) {
    await Util.exec(`free -m`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看各分区使用情况
   */
  async systemFile(ctx, next) {
    await Util.exec(`df -h`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看系统负载
   */
  async loadavg(ctx, next) {
    await Util.exec(`cat /proc/loadavg`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看内存信息
   */
  async meminfo(ctx, next) {
    await Util.exec(`cat /proc/meminfo`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看网卡信息
   */
  async eth(ctx, next) {
    await Util.exec(`dmesg | grep -i eth`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 实时显示进程状态
   */
  async top(ctx, next) {
    await Util.exec(`top`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  // #endregion
}

export default new SystemController()