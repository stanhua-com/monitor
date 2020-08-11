'use strict'

export default {
  // appkey
  appKey: 'SESSION_MONITOR',
  // 服务
  server: {
    port: 8009,
    host: 'localhost'
  },
  // 邮箱
  mail: {
    host: '',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '',
      pass: '',
    },
  }
}