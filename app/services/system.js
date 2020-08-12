'use strict'

import os from 'os'

import Utils from '../../utils'

export default class SystemService {
  constructor() {
    console.log('arch:', os.arch())
    console.log('cpus:', os.cpus())
    console.log('endianness:', os.endianness())
    console.log('系统总内存:', os.totalmem() / 1024 / 1024 / 1024)
    console.log('空闲内存字节:', os.freemem() / 1024 / 1024 / 1024)
    console.log('homedir:', os.homedir())
    console.log('hostname:', os.hostname())
    console.log('loadavg:', os.loadavg())
    console.log('networkInterfaces:', os.networkInterfaces())
    console.log('platform:', os.platform())
    console.log('release:', os.release())
    console.log('tmpdir:', os.tmpdir())
    console.log('type:', os.type())
    console.log('uptime:', os.uptime())
    console.log('process:', process.uptime())
    getCPUUsage((v) => {
      console.log('getCPUUsage:', v)
    })

    function getCPUUsage(callback, free) {

      var stats1 = getCPUInfo();
      var startIdle = stats1.idle;
      var startTotal = stats1.total;

      setTimeout(function () {
        var stats2 = getCPUInfo();
        var endIdle = stats2.idle;
        var endTotal = stats2.total;

        var idle = endIdle - startIdle;
        var total = endTotal - startTotal;
        var perc = idle / total;

        if (free === true)
          callback(perc);
        else
          callback((1 - perc));

      }, 1000);
    }

    function getCPUInfo(callback) {
      var cpus = os.cpus();

      var user = 0;
      var nice = 0;
      var sys = 0;
      var idle = 0;
      var irq = 0;
      var total = 0;

      for (var cpu in cpus) {
        if (!cpus.hasOwnProperty(cpu)) continue;
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
      }

      var total = user + nice + sys + idle + irq;

      return {
        'idle': idle,
        'total': total
      };
    }
  }

  /**
   * 操作系统信息
   */
  static info() {
    return {
      platform: os.platform(),
      homedir: os.homedir(),
      release: os.release(),
      tmpdir: os.tmpdir(),
      uptime: os.uptime(),
      processtime: process.uptime(),
      type: os.type(),
      arch: os.arch(),
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      cpus: os.cpus(),
      networkInterfaces: os.networkInterfaces(),
      endianness: os.endianness(),
      totalmem: os.totalmem() / 1024 / 1024,
      freemem: os.freemem() / 1024 / 1024,
      userInfo: os.userInfo()
    }
  }

  /**
   * 使用率   
   */
  static usage() {
    return new Promise(async (resolve) => {
      let stats1 = SystemService.CPUInfo()
      let startIdle = stats1.idle
      let startTotal = stats1.total

      await Utils.sleep(1000)

      let stats2 = SystemService.CPUInfo()
      let perc = (stats2.idle - startIdle) / (stats2.total - startTotal)

      resolve({
        cpu: perc,
        freemem: os.freemem() / 1024 / 1024,
        uptime: os.uptime(),
      })

    })
  }

  static CPUInfo() {
    const cpus = os.cpus()

    let user = 0
    let nice = 0
    let sys = 0
    let idle = 0
    let irq = 0

    for (let cpu in cpus) {
      if (!cpus.hasOwnProperty(cpu)) continue
      user += cpus[cpu].times.user
      nice += cpus[cpu].times.nice
      sys += cpus[cpu].times.sys
      irq += cpus[cpu].times.irq
      idle += cpus[cpu].times.idle
    }

    return { idle, total: user + nice + sys + idle + irq }
  }
}