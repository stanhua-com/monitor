'use strict'

const pm2 = require('pm2')

import ErrorInfo from '../../utils/errorInfo'
import Log from '../../utils/log'

class Pm2Service {
  constructor() {

  }

  connect() {
    return new Promise((resolve, reject) => {
      pm2.connect((err) => {
        if (err) {
          Log.error(err)
          reject(err)
          return ErrorInfo.serverError()
        }

        resolve()
      })
    })
  }

  /**
   * 启动将由pm2管理的脚本
   * @param {String} options.name                   An arbitrary name that can be used to interact with (e.g. restart) the process later in other commands.
   * @param {String} options.script                 The path of the script to run
   * @param {String | Array} options.args                 A string or array of strings composed of arguments to pass to the script.
   * @param {String | Array} options.interpreter_args       A string or array of strings composed of arguments to call the interpreter process with.
   * @param {String} options.cwd                        The working directory to start the process with.
   * @param {String} options.output                     The path to a file to append stdout output to.(Default: “~/.pm2/logs/app_name-out.log”) 
   * @param {String} options.error                      The path to a file to append stdout output to.(Default: “~/.pm2/logs/app_name-error.err”)
   * @param {String} options.log_date_format            The display format for log timestamps (eg “YYYY-MM-DD HH:mm Z”). 
   * @param {String} options.pid                        The path to a file to write the pid of the started process. (Default: “~/.pm2/logs/~/.pm2/pids/app_name-id.pid”)
   * @param {String} options.min_uptime             The minimum uptime of the script before it’s considered successfully started.
   * @param {String} options.exec_mode              Allows your app to be clustered(cluster)
   * @param {String} options.instances              Optional: Scales your app by 4
   * @param {String} options.max_memory_restart     Optional: Restarts your app if it reaches 100Mo
   */
  async start(options) {
    await this.connect().then(() => {
      pm2.start(options, (err) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '启动失败', data: '' }
        }
        return { code: 200, msg: '', data: '' }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 停止进程，但将进程元数据保留在pm2的列表中
   * @param {String} process   进程              
   */
  async stop(process) {
    await this.connect().then(() => {
      pm2.stop(process, (err) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '停止进程失败', data: '' }
        }
        return { code: 200, msg: '', data: '' }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 停止并重新启动该过程
   * @param {String} process    进程             
   */
  async restart(process) {
    await this.connect().then(() => {
      pm2.restart(process, (err) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '停止并重新启动失败', data: '' }
        }
        return { code: 200, msg: '', data: '' }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 停止该进程并将其从pm2的列表中删除。
   * @param {String} process    进程            
   */
  async delete(process) {
    await this.connect().then(() => {
      pm2.delete(process, (err) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '删除失败', data: '' }
        }
        return { code: 200, msg: '', data: '' }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 零停机滚动重启
   * @param {String} process    进程            
   */
  async reload(process) {
    await this.connect().then(() => {
      pm2.reload(process, (err, proc) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '重启失败', data: '' }
        }
        return { code: 200, msg: '', data: proc }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 杀死pm2守护程序         
   */
  async kill() {
    await this.connect().then(() => {
      pm2.killDaemon((err) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '杀死pm2守护程序失败', data: '' }
        }
        return { code: 200, msg: '', data: '' }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 返回有关流程的各种信息
   * @param {String} process    进程            
   */
  async describe(process) {
    await this.connect().then(() => {
      pm2.describe(process, (err, processDescription) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '查看失败', data: '' }
        }
        return { code: 200, msg: '', data: processDescription }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 获取由pm2管理的正在运行的进程的列表
   */
  async list() {
    let arr = []
    await this.connect().then(() => {
      pm2.list((err, list) => {
        pm2.disconnect()

        if (err) {
          Log.error(err)
          return { code: 1001, msg: '获取失败', data: '' }
        }
        arr = [1]
        return { code: 200, msg: '', data: list }
      })
    }).catch(err => {
      console.log(err)
    })
    return arr
  }

  /**
   * 将进程列表写入DUMP_FILE_PATH环境变量 ("~/.pm2/dump.pm2" by default)
   */
  async dump() {
    await this.connect().then(() => {
      pm2.dump((err, result) => {
        pm2.disconnect()

        if (err) {
          Log.error(err)
          return { code: 1001, msg: '写入失败', data: '' }
        }

        return { code: 200, msg: '', data: result }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 刷新日志
   * @param {String} process   进程            
   */
  async flush(process) {
    await this.connect().then(() => {
      pm2.flush(process, (err, result) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '刷新日志失败', data: '' }
        }
        return { code: 200, msg: '', data: result }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 滚动日志文件(the default format being ${process.name}-${out|err}-${number}.log)       
   */
  async reloadLogs() {
    await this.connect().then(() => {
      pm2.reloadLogs((err, result) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '滚动日志文件失败', data: '' }
        }
        return { code: 200, msg: '', data: result }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 打开消息总线           
   */
  async launchBus() {
    await this.connect().then(() => {
      pm2.launchBus((err, bus) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '打开消息总线失败', data: '' }
        }
        return { code: 200, msg: '', data: bus }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * 将脚本注册为将在计算机启动时启动的进程
   * 当前进程列表将被转储并保存，以便在重新启动时复活。
   * @param {String} platform   平台("ubuntu", "centos", "redhat", "gentoo", "systemd", "darwin", or "amazon")
   */
  async startup(platform) {
    await this.connect().then(() => {
      pm2.startup(platform, (err, result) => {
        pm2.disconnect()
        if (err) {
          Log.error(err)
          return { code: 1001, msg: '打开消息总线失败', data: '' }
        }
        return { code: 200, msg: '', data: result }
      })
    }).catch(err => {
      console.log(err)
    })
  }

}

export default new Pm2Service()