'use strict'

import Controller from './index'

import Util from '../../utils'

class Pm2Controller extends Controller {
  constructor() {
    super()

  }

  /**
   * 启动进程/应用
   */
  async start(ctx, next) {
    let { options } = ctx.request.body

    if (this.isEmpty(options))
      return ctx.body = this.errorInfo.required('options')

    await Util.exec(`pm2 start ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }


  /**
   * 结束进程/应用
   * @param {String} process   进程
   */
  async stop(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    await Util.exec(`pm2 stop ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 停止并重新启动该过程
   * @param {String} process    进程
   */
  async restart(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    await Util.exec(`pm2 restart ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 停止该进程并将其从pm2的列表中删除。
   * @param {String} process    进程
   */
  async delete(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    await Util.exec(`pm2 delete ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 零停机滚动重启
   * @param {String} process    进程
   */
  async reload(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')


    await Util.exec(`pm2 reload ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 杀死pm2守护程序
   */
  async kill(ctx, next) {
    await Util.exec(`pm2 kill`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 零停机滚动重启
   * @param {String} process    进程
   */
  async describe(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    await Util.exec(`pm2 describe ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 获取由pm2管理的正在运行的进程的列表
   */
  async list(ctx, next) {
    await Util.exec('pm2 ls').then(res => {
      // console.log(res)
      // let list = res.split(' ')
      // list.splice(0, 1)
      // list.splice(list.length - 1, 1)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 将进程列表写入DUMP_FILE_PATH环境变量 ("~/.pm2/dump.pm2" by default)
   */
  async dump(ctx, next) {
    await Util.exec(`pm2 dump`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 刷新日志
   * @param {String} process   进程
   */
  async flush(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    await Util.exec(`pm2 flush ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看pm2的日志
   */
  async logs(ctx, next) {
    let { process } = ctx.request.body

    await Util.exec(`pm2 logs ${process}`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 查看进程/应用的资源消耗情况
   */
  async monit(ctx, next) {
    await Util.exec(`pm2 monit`).then(res => {
      console.log(res)
      ctx.body = { code: 200, msg: '', data: res }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 打开消息总线
   */
  async launchBus(ctx, next) {
    ctx.body = await Pm2.reloadLogs()
  }

  /**
   * 将脚本注册为将在计算机启动时启动的进程
   * 当前进程列表将被转储并保存，以便在重新启动时复活。
   * @param {String} platform   平台("ubuntu", "centos", "redhat", "gentoo", "systemd", "darwin", or "amazon")
   */
  async startup(ctx, next) {
    let { platform } = ctx.request.body

    if (this.isEmpty(platform))
      return ctx.body = this.errorInfo.required('platform')

    ctx.body = await Pm2.startup(platform)
  }

}

export default new Pm2Controller()