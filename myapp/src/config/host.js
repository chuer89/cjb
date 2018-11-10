import HOST_ENV from './env.js'

const hosts = {
  DEV: {
    SSO:'//dev.sso.worldfarm.com',
    IM:'//dev.sms.worldfarm.com',
    ROLE:'//dev.uc.worldfarm.com',
    ADMIN:'//dev.trade.worldfarm.com',
    DATA:'//dev.report.worldfarm.com',
    FARM: '//dev.gather.worldfarm.com',
    UC: '//dev.uc.worldfarm.com',
  },
  PROD: {
    SSO:'//sso.worldfarm.com',
    IM:'//sms.worldfarm.com',
    ROLE:'//uc.worldfarm.com',
    ADMIN:'//trade.worldfarm.com',
    DATA:'//report.worldfarm.com',
    FARM: '//gather.worldfarm.com',
    UC: '//uc.worldfarm.com',
  },
};


const getHost = () => {
  if (HOST_ENV === 'mock') {
    return Object.keys(hosts.DEV).reduce((obj, host) => {
      obj[host] = 'http://localhost:8000'
      return obj
    }, {})
  }

  if(HOST_ENV === 'dev') {
    return hosts.DEV
  }
  return hosts.PROD
}

console.log(HOST_ENV, getHost());

export default getHost();
