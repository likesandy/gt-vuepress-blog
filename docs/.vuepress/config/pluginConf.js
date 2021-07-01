const moment = require('moment');

moment.locale("zh-cn");

module.exports = {
  'go-top': true,
  '@vuepress/medium-zoom': {
    selector: '.content__default img',
  },
  '@vuepress/last-updated': {
    transformer: (timestamp) => moment(timestamp).format('LLLL')
  },
  // "vuepress-plugin-auto-sidebar": {
  //   title: {
  //     mode: "default",
  //     map: {
  //       "/applet/native/": "邂逅小程序",
  //     }
  //   },
  // },
  // 'one-click-copy': {
  //   copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
  //   copyMessage: '复制成功',
  //   duration: 1000,
  //   showInMobile: false
  // },
  'vuepress-plugin-smooth-scroll': true,
  'img-lazy': true,
};