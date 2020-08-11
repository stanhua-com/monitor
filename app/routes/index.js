'use strict'

import Router from 'koa-router'

const router = Router()

router.prefix('/api')

import Pm2 from './pm2'

router.use(Pm2.routes(), Pm2.allowedMethods())

export default router