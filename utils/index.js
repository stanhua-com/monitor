'use strict'

import { v4 as uuid4 } from 'uuid'
import request from 'request'
import cheerio from 'cheerio'
import shell from 'shelljs'

export default class Util {
  constructor() {

  }

  /**
   * ip
   */
  static ip(ctx) {
    return ctx.request.headers['x-real-ip'] && ctx.request.headers['x-real-ip'].replace('::ffff:', '') || ctx.request.ip.replace('::ffff:', '')
  }

  /**
   * ip地址归属地
   * @param {String} ip ip地址
   */
  static async ipAddress(ip) {
    let res = await this.request({ url: `https://ipchaxun.com/${ip}/`, method: 'GET' })
    if (res.statusCode === 200) {
      let $ = cheerio.load(res.body)
      res = null

      let $con = $('#rdns').prev('p')

      if ($con.length) {
        $ = null
        let $item = $con.children('label')
        if ($item.length === 3) {
          return {
            address: $item.eq(1).children('.value').text().trim(),
            operators: $item.eq(2).children('.value').text().trim()
          }
        }
        else {
          return ''
        }
      }
      else {
        $ = null
        $con = null
        return ''
      }
    }
    else {
      res = null
      return ''
    }
  }

  /**
   * 设备信息
   */
  static device(ctx) {
    let ua = ctx.request.headers['user-agent'].toLowerCase()
    if (/android/.test(ua) || /iphone/.test(ua) || /ipod/.test(ua) || /ipad/.test(ua) ||
      /midp/.test(this.ua) || /symbianos/.test(this.ua) || /windows ce/.test(this.ua) ||
      /windows mobile/.test(this.ua) || /windows phone/.test(this.ua)) {
      return '移动端'
    }
    else {
      return 'PC端'
    }
  }

  /**
   * 延迟
   * @param {Number} time 延迟时间
   */
  static sleep(time) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, time)
    })
  }

  /**
   * request
   * @param {Object} options
   */
  static request(options) {
    return new Promise((resolve, reject) => {
      request(options, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }

  /**
   * requestPost
   * @param {String} url
   * @param {Object} options
   */
  static requestPost(url, options) {
    return new Promise((resolve, reject) => {
      request.post(url, options, (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  }


  /**
   * 随机字符串
   * @param {Number} length 位数
   */
  static randomString(length) {
    length = length || 32
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let pos = chars.length
    let nonces = []
    for (let i = 0; i < length; i++) {
      nonces.push(chars.charAt(Math.floor(Math.random() * pos)))
    }
    return nonces.join('')
  }

  /**
   * uuid
   * @param {Boolean} debar 去杠
   */
  static uuid(debar = true) {
    let s = uuid4().toString()
    debar && (s = s.replace(/-/g, ''))
    return s
  }

  /**
   * 执行命令
   * @param {String} command 命令
   */
  static exec(command) {
    return new Promise((resolve, reject) => {
      shell.exec(command, { silent: true, async: true }, (code, stdout, stderr) => {
        if (code === 0) resolve(stdout)
        else {
          reject(stderr)
          throw stderr
        }
      })
    })
  }

}