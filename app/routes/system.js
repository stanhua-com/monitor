'use strict'

import Router from 'koa-router'

const router = Router()

import System from '../controllers/system'

router.prefix('/system')

router.get('/info', System.info.bind(System))
router.get('/usage', System.usage.bind(System))

export default router 