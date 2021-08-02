const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');
const sidebarConf = require('./config/sidebarConf');

module.exports = {
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: [
    ['link', { rel: 'icon', href: '/sandy.jpg' }],
  ],
  plugins: pluginConf,
  themeConfig: {
    logo: '/sandy.jpg',
    nav: navConf,
    sidebar: sidebarConf,
    lastUpdated: '上次更新',
  },
};
