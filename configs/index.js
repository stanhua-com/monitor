'use strict'

export default {
  // appkeys
  keys: ['SESSION_MONITOR1', 'SESSION_MONITOR2'],
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
  },
  jwt: {
    // 密钥
    secret: 'YOWPewyGHKu4Y_0M_vtlEnNlqmFOclqp4Hy6hVHfFT4',
    // 有效时长
    expiresIn: '2h',
    // 路由拦截
    unlessPath: [
      /^\/public/,
      /^\/api\/login/,
      /^\/api/,
      // /^((?!\/api).)*$/
    ]
  }
}