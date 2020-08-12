'use strict'

import Controller from './index'

import Util from '../../utils'

import Pm2 from '../services/pm2'

class Pm2Controller extends Controller {
  constructor() {
    super()

  }

  /**
   * 启动将由pm2管理的脚本
   */
  async start(ctx, next) {

    let { options } = ctx.request.body

    if (this.isEmpty(options))
      return ctx.body = this.errorInfo.required('options')

    if (Object.prototype.toString.call(options) !== '[object Object]')
      return ctx.body = this.errorInfo.invalid('options')

    ctx.body = await Pm2.start(options)
  }


  /**
   * 停止进程，但将进程元数据保留在pm2的列表中
   * @param {String} process   进程              
   */
  async stop(ctx, next) {

    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    ctx.body = await Pm2.stop(process)
  }

  /**
   * 停止并重新启动该过程
   * @param {String} process    进程             
   */
  async restart(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    ctx.body = await Pm2.restart(process)
  }

  /**
   * 停止该进程并将其从pm2的列表中删除。
   * @param {String} process    进程            
   */
  async delete(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    ctx.body = await Pm2.delete(process)
  }

  /**
   * 零停机滚动重启
   * @param {String} process    进程            
   */
  async reload(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    ctx.body = await Pm2.reload(process)
  }

  /**
   * 杀死pm2守护程序         
   */
  async kill(ctx, next) {
    ctx.body = await Pm2.kill()
  }

  /**
   * 零停机滚动重启
   * @param {String} process    进程            
   */
  async describe(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    ctx.body = await Pm2.describe(process)
  }

  /**
   * 获取由pm2管理的正在运行的进程的列表
   */
  async list(ctx, next) {
    await Util.exec('pm2 ls').then(res => {
      console.log(res)
      let list = res.split(' ')
      list.splice(0, 1)
      list.splice(list.length - 1, 1)
      ctx.body = { code: 200, msg: '', data: list }
    }).catch((err) => {
      ctx.body = { code: 1001, msg: '', data: err }
    })
  }

  /**
   * 将进程列表写入DUMP_FILE_PATH环境变量 ("~/.pm2/dump.pm2" by default)
   */
  async dump(ctx, next) {
    ctx.body = await Pm2.list()
  }

  /**
   * 刷新日志
   * @param {String} process   进程            
   */
  async flush(ctx, next) {
    let { process } = ctx.request.body

    if (this.isEmpty(process))
      return ctx.body = this.errorInfo.required('process')

    ctx.body = await Pm2.flush(process)
  }

  /**
   * 滚动日志文件(the default format being ${process.name}-${out|err}-${number}.log)       
   */
  async reloadLogs(ctx, next) {
    ctx.body = await Pm2.reloadLogs()
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