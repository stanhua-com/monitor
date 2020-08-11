'use strict'

import request from 'request'
import xml2js from 'xml2js'
import Log from './log'

class Fetch {
  constructor() {
  }

  /**
   * get
   * @param {String}  options.url  请求地址
   */
  get(options = {}) {
    return new Promise((resolve, reject) => {
      request.get(options, (err, res, body) => {
        if (err) {
          Log.error(err)
          reject({ code: 500, data: '', msg: err })
        }
        else {
          if (res.statusCode === 200) {
            resolve(JSON.parse(body))
          }
          else {
            reject({ code: 500, data: '', msg: res })
          }
        }
      })
    })
  }

  /**
   * post
   * @param {String}  url    请求地址
   * @param {Object}  data   请求数据
   */
  post(url, data) {
    console.log('data', data)
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'POST',
        json: true,
        // // encoding: null,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      }, (err, res, body) => {
        if (err) {
          Log.error(err)
          reject({ code: 500, data: '', msg: err })
        }
        else {
          if (res.statusCode === 200) {
            resolve(body)
          }
          else {
            reject({ code: 500, data: '', msg: res })
          }
        }
      })
    })
  }


  /**
   * xml
   * @param {String}  url    请求地址
   * @param {Object}  data   请求数据
   */
  xml(url, data) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'POST',
        body: new xml2js.Builder().buildObject(data)
      }, (err, res, body) => {
        if (err) {
          Log.error(err)
          reject({ code: 500, data: '', msg: err })
        }
        else {
          if (res.statusCode === 200) {
            resolve(body)
          }
          else {
            reject({ code: 500, data: '', msg: res })
          }
        }
      })
    })
  }
}

export default new Fetch()