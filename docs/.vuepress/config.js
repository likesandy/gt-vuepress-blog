const moment = require('moment');

module.exports = {
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: [
    [
      'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: 'icon', href: '/img/Sandy.jpg' }
    ]
  ],
  port: "8080",
  themeConfig: {
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    collapsable: true,
    lastUpdated: "最近更新",
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: "更新",
      },
    },
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页 ！",
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp) => {
          const moment = require('moment')
          moment.locale('zh-cn')
          return moment(timestamp).format('LLLL')
        }
      }
    ],
    ['@vuepress/back-to-top'],
    ['@vuepress/medium-zoom']
  ]
};
