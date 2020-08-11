'use strict'

import nodeSchedule from 'node-schedule'

import Util from '../utils/index'

export default class Schedule {
  /**
   * 定时任务
   * @param {Number} rule.second    0-59
   * @param {Number} rule.minute    0-59
   * @param {Number} rule.hour      0-23
   * @param {Number} rule.date      1-31
   * @param {Number} rule.month     0-11
   * @param {Number} rule.year   
   * @param {Number} rule.dayOfWeek 0-6 Starting with Sunday
   */
  constructor(rule = {}) {
    this.nodeSchedule = nodeSchedule
    this.jobName = Util.uuid()
    this.rule = rule
  }

  /**
   * 开始启动
   */
  start() {
    new Promise((resolve, reject) => {
      let rule = new nodeSchedule.RecurrenceRule()
      rule = Object.assign({}, rule, this.rule)
      try {
        nodeSchedule.scheduleJob(this.jobName, rule, () => {
          resolve()
        })
      } catch (error) {
        reject()
      }
    })
  }

  /**
   * 取消
   */
  cancel() {
    this.nodeSchedule.scheduledJobs[this.jobName].cancel()
  }
}
