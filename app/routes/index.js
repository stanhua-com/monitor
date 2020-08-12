'use strict'

import Router from 'koa-router'

const router = Router()

router.prefix('/api')

import Pm2 from './pm2'
import System from './system'

router.use(Pm2.routes(), Pm2.allowedMethods())
router.use(System.routes(), System.allowedMethods())

export default router