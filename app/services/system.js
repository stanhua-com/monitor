'use strict'

import os from 'os'

class SystemService {
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
}

export default new SystemService()