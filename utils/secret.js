'use strict'

import crypto from 'crypto'

export default class Secret {
  constructor() {
  }

  /**
   * 加密
   * @param {String|Buffer} data 数据
   * @param {String}        algorithm   算法  ['md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512']
   */
  static Encrypt(data, algorithm) {
    let c = crypto.createHash(algorithm)
    c.update(data)
    return c.digest('hex')
  }

  /**
   * 签名
   * @param {String|Buffer} data 数据
   */
  static Sign(data) {
    return data + '.' + this.Encrypt(data, 'sha256')
  }

  /**
   * 反向签名
   * @param {String|Buffer} data 数据
   */
  static Unsign(data) {
    let temp = data.slice(0, data.lastIndexOf('.'))
    let mac = this.Sign(temp)
    return mac == data ? temp : false
  }

  /**
   * MD5加密
   * @param {String|Buffer} data 数据
   * @param {String}        salt
   */
  static MD5(data, salt) {
    if (salt)
      data += salt
    return this.Encrypt(data, 'md5')
  }

  /**
   * ASE加密
   * @param {String|Buffer} data 数据
   * @param {String} key         密钥
   */
  static ASE_Encrypt(data, key) {
    let cipher = crypto.createCipheriv('aes-128-ecb', key, Buffer.alloc(0))
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  }

  /**
   * ASE解密
   * @param {String|Buffer} data 数据
   * @param {String} key         密钥
   */
  static ASE_Decrypt(data, key) {
    let cipher = crypto.createDecipheriv('aes-128-ecb', key, Buffer.alloc(0))
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8')
  }

  /**
   * 创建token
   * @param {String|Buffer} publicKey   公钥         
   * @param {String|Buffer} privateKey  私钥      
   * @param {String|Buffer} ts          
   */
  static CreateToken(publicKey, privateKey, ts) {
    return this.Encrypt(`${publicKey}:${privateKey}:${ts}`, 'sha1')
  }

  /**
   * 验证token
   * @param {String|Buffer} publicKey   公钥         
   * @param {String|Buffer} privateKey  私钥      
   * @param {String|Buffer} ts             
   * @param {String|Buffer} signOrigin  token       
   */
  static ValidToken(publicKey, privateKey, ts, signOrigin) {
    let sign = this.CreateToken(publicKey, privateKey, ts)
    return (sign === signOrigin)
  }
}