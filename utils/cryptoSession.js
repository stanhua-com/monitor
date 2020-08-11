'use strict'

import crypto from 'crypto'

/**
 * Session加密
 * @param {Object}   options         
 * @param {Boolean}  options.signed 
 * @param {String}   options.iv      
 * @param {String}   options.algorithm  
 * @param {Function} options.encode      加密
 * @param {Function} options.decode      解密
 */
export default (session, app, options = {}) => {
  options.signed = options.signed == undefined ? true : options.signed
  options.algorithm = options.algorithm || 'aes-128-cbc'
  options.encode = encode
  options.decode = decode

  app.use(session(app, options))


  function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv)
    let crypted = cipher.update(text, 'utf8', 'base64')
    crypted += cipher.final('base64')

    return crypted
  }

  function decrypt(text) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv)
    let dec = decipher.update(text, 'base64', 'utf8')
    dec += decipher.final('utf8')

    return dec
  }

  function encode(body) {
    body = JSON.stringify(body)
    let base64 = new Buffer(body).toString('base64')

    return encrypt(base64)
  }

  function decode(text) {
    let body = new Buffer(decrypt(text), 'base64').toString('utf8')
    let json = JSON.parse(body)

    // check if the cookie is expired
    if (!json._expire) return null
    if (json._expire < Date.now()) return null

    return json
  }
}