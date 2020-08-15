'use strict'
import util from 'util'
import { exec } from 'child_process'

export default class ChildProcess {
  constructor() {
  }

  /**
   * 执行bash命令输出内容解析
   * @param {String} output   执行bash命令输出内容
   * @param {Array} titles    标题
   */
  static execArrayParse(output, titles = []) {
    if (!output) return ''
    console.log(output)
    let list = []
    let lines = String(output).trim().split('\n')
    if (titles.length & lines.length <= 1) return []

    for (let i = 1; i < lines.length; i++) {
      const a = lines[i].split(/\s+/)
      let o = {}
      for (let k = 0; k < a.length; k++) {
        o[titles[k]] = a[k]
      }
      for (let k = a.length; k < titles.length; k++) {
        o[titles[k]] = ''
      }
      list.push(o)
    }
    return list
  }

  /**
   * 执行ls命令输出内容解析
   * @param {String} output   执行bash命令输出内容
   * @param {Array} titles    标题
   */
  static execLsParse(output, titles = []) {
    if (!output) return ''
    console.log(output)
    let list = []
    let lines = String(output).trim().split('\n')
    if (titles.length & !lines.length) return []

    for (let i = 1; i < lines.length; i++) {
      const a = lines[i].split(/\s+/)
      let o = {}
      o[titles[0]] = a[0][0]
      o[titles[1]] = a[0]
      o[titles[2]] = `${a[2]} ${a[3]}`
      o[titles[3]] = a[4]
      o[titles[4]] = `${a[5]} ${a[6]} ${a[7]}`

      let ns = []
      for (let k = 8; k < a.length; k++) {
        ns.push(a[k])
      }
      o[titles[5]] = ns.join(' ')
      
      list.push(o)
    }
    return list
  }

  /**
   * 执行bash命令输出内容解析
   * @param {String} output   执行bash命令输出内容
   * @param {Number} count    对象个数
   */
  static execObjectParse(output) {
    if (!output) return ''
    let lines = String(output).trim().replace(/ kB/g, '').split('\n')
    let o = {}
    for (let i = 0; i < lines.length; i++) {
      let a = lines[i].split(': ')
      o[a[0]] = a[1] ? String(a[1]).trim() : ''
    }
    return o
  }

  /**
   * 同步执行bash命令
   * @param {String} command                    要运行的命令，参数使用空格分隔。
   * @param {String} options.cwd                子进程的当前工作目录。 默认值: null。
   * @param {Object} options.env                环境变量的键值对。 默认值: process.env。
   * @param {String} options.encoding           默认值: 'utf8'。
   * @param {String} options.shell              用于执行命令。 参见 shell 的要求和默认的 Windows shell。 默认值: Unix 上是 '/bin/sh'，Windows 上是 process.env.ComSpec。
   * @param {Number} options.timeout            默认值: 0。
   * @param {Number} options.maxBuffer          stdout 或 stderr 上允许的最大数据量（以字节为单位）。 如果超过限制，则子进程会被终止，并且输出会被截断。 参见 maxBuffer 和 Unicode 的注意事项。 默认值: 1024 * 1024。
   * @param {String|Number} options.killSignal  默认值: 'SIGTERM'。
   * @param {Number} options.uid                设置进程的用户标识，参见 setuid(2)。
   * @param {Number} options.gid                设置进程的群组标识，参见 setgid(2)。
   * @param {Boolean} options.windowsHide       隐藏子进程的控制台窗口（在 Windows 系统上通常会创建）。 默认值: false。
   */
  static async exec(command, options) {
    // let SEPARATOR = process.platform === 'win32' ? ';' : ':'
    return new Promise(async (resolve, reject) => {
      const _exec = util.promisify(exec)
      const { stdout, stderr } = await _exec(command, options)
      if (stderr) {
        reject(stderr)
        throw stderr
      }
      resolve(stdout)

    })
  }
}