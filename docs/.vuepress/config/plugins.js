const moment = require('moment')

moment.locale('zh-cn')

module.exports = {
  '@vuepress/last-updated': {
    transformer: (timestamp) => moment(timestamp).format('LLLL')
  },
  '@vuepress/back-to-top': true,
  '@vuepress/medium-zoom': true,
  "vuepress-plugin-auto-sidebar": {
    title: {
      mode: "default",
      map: {
        "/applet/native/": "邂逅小程序",
      }
    },
    collapse: {
      collapseList: ["/applet/native/"]
    }
  }
}