const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');

module.exports = {
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  themeConfig: {
    nav: navConf,
    lastUpdated: '上次更新',
  },
};
