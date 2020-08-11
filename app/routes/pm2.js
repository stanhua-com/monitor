'use strict'

import Router from 'koa-router'

const router = Router()

import Pm2 from '../controllers/pm2'

router.prefix('/pm2')

router.get('/list', Pm2.list.bind(Pm2))

router.post('/start', Pm2.start.bind(Pm2))
router.post('/stop', Pm2.stop.bind(Pm2))
router.post('/restart', Pm2.restart.bind(Pm2))
router.post('/delete', Pm2.delete.bind(Pm2))
router.post('/reload', Pm2.reload.bind(Pm2))
router.post('/kill', Pm2.kill.bind(Pm2))
router.post('/describe', Pm2.describe.bind(Pm2))
router.post('/dump', Pm2.dump.bind(Pm2))
router.post('/flush', Pm2.flush.bind(Pm2))
router.post('/reload_logs', Pm2.reloadLogs.bind(Pm2))
router.post('/launch_bus', Pm2.launchBus.bind(Pm2))
router.post('/startup', Pm2.startup.bind(Pm2))

export default router 