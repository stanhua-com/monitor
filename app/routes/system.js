'use strict'

import Router from 'koa-router'

const router = Router()

import System from '../controllers/system'

router.prefix('/system')

router.get('/info', System.info.bind(System))
router.get('/usage', System.usage.bind(System))
router.get('/free', System.free.bind(System))
router.get('/system_file', System.systemFile.bind(System))
router.get('/loadavg', System.loadavg.bind(System))
router.get('/meminfo', System.meminfo.bind(System))
router.get('/eth', System.eth.bind(System))
router.get('/top', System.top.bind(System))

export default router


  // #region Linux资源