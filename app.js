'use strict'

import Koa from 'koa'
import helmet from 'koa-helmet'
import koaBody from 'koa-body'
import json from 'koa-json'
import cors from 'koa-cors'
import favicon from 'koa-favicon'
import convert from 'koa-convert'
import jwt from 'koa-jwt'

import KeyGrip from 'keygrip'


import Log from './utils/log'
import ErrorInfo from './utils/errorInfo'
import Response from './middlewares/response'
import Config from './configs'
import Routes from './app/routes'
import Jwt from './utils/jwt'

const app = new Koa()

app.keys = new KeyGrip(Config.keys, 'sha256')

app.use(koaBody())
app.use(helmet())
app.use(json())
app.use(convert(cors()))
app.use(convert(favicon(__dirname + '/public/logo.png')))

app.use(jwt({ secret: Config.jwt.secret }).unless({ path: Config.jwt.unlessPath }))

// router
app.use(Routes.routes(), Routes.allowedMethods())

// 使用响应处理中间件
app.use(Response)

app.use(async (ctx, next) => {
  ctx.res.setHeader('Authorization', Jwt.token({ user: 'stanhua', pass: '123456' }))
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.method !== 'GET' && ctx.method !== 'POST') ctx.status = 200

  const start = new Date()
  await next()
  const ms = new Date() - start
  console.error(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.context.onerror = function (e) {
  this.app.emit('error', e, this)
  this.body = ErrorInfo.serverError()
  this.res.end(this.body)
}

app.on('error', (err, ctx) => {
  if (err) Log.error(err)
})

app.listen(Config.server.port, () => {
  console.log(`Listening on http://${Config.server.host}:${Config.server.port}`)
})

export default app