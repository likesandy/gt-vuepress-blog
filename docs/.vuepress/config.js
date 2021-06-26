const pluginConf = require('./config/pluginConf.js');
const navConf = require('./config/navConf.js');

module.exports = {
  title: "codertao",
  description: "了解真相才能获得真正的自由",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-icon-152x152-dunplab-manifest-48426.jpg' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/apple-icon-144x144-dunplab-manifest-48426.jpg' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    nav: navConf,
    lastUpdated: '上次更新',
  },
};
