// utils/jwt.js
'use strict'

import jwt from 'jsonwebtoken'

import Configs from '../configs'

/**
 * jsonwebtoken
 */
export default class Jwt {
  constructor() {

  }

  /**
   * 签发token
   * @param {Object|String} payload 数据
   */
  static token(payload) {
    return jwt.sign(payload, Configs.jwt.secret, { expiresIn: Configs.jwt.expiresIn })
  }

  /**
   * 验证token
   * @param {String}} token  签发token
   */
  static verify(token) {
    return jwt.verify(token, Configs.jwt.secret, { complete: true })
  }
}