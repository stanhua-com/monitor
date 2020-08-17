'use strict'

import os from 'os'

import Controller from './index'

import Utils from '../../utils'
import Secret from '../../utils/secret'

import ChildProcess from '../../utils/childProcess'

class SystemController extends Controller {
  constructor() {
    super()

  }

  /**
   * 操作系统信息
   */
  info(ctx, next) {
    ctx.cookies.set('agent', Secret.MD5(ctx.header['user-agent']), { signed: true })

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

  // #region Linux 资源

  /**
   * 查看内存使用量和交换区使用量
   * @returns
   * total      内存总数；
   * used       已经使用的内存数；
   * free       空闲的内存数；
   * shared     当前已经废弃不用；
   * buff/cache 缓存内存数；
   * available  开启一个新程序能够使用的最大内存
   */
  async free(ctx, next) {
    await ChildProcess.exec(`free -m`).then(res => {
      ctx.body = { code: 200, msg: '', data: ChildProcess.execArrayParse(res, ['', 'total', 'used', 'free', 'shared', 'buff/cache', 'available']) }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看系统负载
   */
  async loadavg(ctx, next) {
    await ChildProcess.exec(`cat /proc/loadavg`).then(res => {
      ctx.body = { code: 200, msg: '', data: res ? String(res).replace('\n', '') : '' }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看内存信息
   */
  async meminfo(ctx, next) {
    await ChildProcess.exec(`cat /proc/meminfo`).then(res => {
      ctx.body = { code: 200, msg: '', data: ChildProcess.execObjectParse(res) }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看网卡信息
   */
  async eth(ctx, next) {
    await ChildProcess.exec(`dmesg | grep -i eth`).then(res => {
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  // #endregion


  // #region 文件基本属性

  /**
   * 查看各分区使用情况
   */
  async disk(ctx, next) {
    await ChildProcess.exec(`df -h`).then(res => {
      ctx.body = { code: 200, msg: '', data: ChildProcess.execArrayParse(res, ['Filesystem', 'Size', 'Used', 'Avail', 'Use%', 'Mounted on']) }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 文件属主和属组
   * d:目录,
   * -:文件,
   * l:链接文档(link file),
   * b:装置文件里面的可供储存的接口设备(可随机存取装置)
   * c:装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)
   * [ r ]代表可读(read)、[ w ]代表可写(write)、[ x ]代表可执行(execute)
   * @param {String} cd cd路径
   * @returns
   * FileName          文件名
   * FileSize          文件大小
   * FileType          文件类型
   * RecentlyModified  最近修改
   * Authority         权限
   * AllGroups         所有者/组
   */
  async ls(ctx, next) {
    let { cd } = ctx.query
    cd = cd || '/'
    await ChildProcess.exec(`ls -al ${cd}`).then(res => {
      ctx.body = { code: 200, msg: '', data: ChildProcess.execLsParse(res, ['FileType', 'Authority', 'AllGroups', 'FileSize', 'RecentlyModified', 'FileName']) }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  // #endregion

}

export default new SystemController()