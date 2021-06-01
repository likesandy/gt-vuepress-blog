const moment = require('moment');

moment.locale("zh-cn");

module.exports = {
  '@vuepress/back-to-top': true,
  '@vuepress/medium-zoom': {
    selector: '.content__default img',
  },
  '@vuepress/last-updated': {
    transformer: (timestamp) => moment(timestamp).format('LLLL')
  },
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
  },
};